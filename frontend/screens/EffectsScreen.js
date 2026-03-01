import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    SafeAreaView, ScrollView, ActivityIndicator, StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { uploadVideo, applyEffects } from '../utils/api';

const EFFECTS = [
    { id: 'none', name: 'Original', icon: 'circle', color: '#6B7280', desc: 'Sem efeito' },
    { id: 'vintage', name: 'Vintage', icon: 'camera', color: '#A855F7', desc: 'Retrô clássico' },
    { id: 'glitch', name: 'Glitch', icon: 'zap', color: '#FF416C', desc: 'Distorção digital' },
    { id: 'saturation', name: 'Pop Art', icon: 'sun', color: '#F59E0B', desc: 'Cores vibrantes' },
    { id: 'blackwhite', name: 'B&W', icon: 'moon', color: '#94A3B8', desc: 'Preto e Branco' },
];

export default function EffectsScreen({ navigation, route }) {
    const { videoUri } = route.params;
    const [selectedEffect, setSelectedEffect] = useState('none');
    const [processing, setProcessing] = useState(false);
    const [stage, setStage] = useState(''); // 'uploading' | 'processing'

    const handleApply = async () => {
        try {
            setProcessing(true);
            setStage('uploading');

            const uploadResult = await uploadVideo(videoUri);

            setStage('processing');

            const processedUrl = await applyEffects(uploadResult.video_id, selectedEffect);

            navigation.navigate('Preview', { processedVideoUri: processedUrl });
        } catch (e) {
            console.error(e);
            alert("Erro ao processar vídeo. Verifique se o servidor está rodando.");
        } finally {
            setProcessing(false);
            setStage('');
        }
    };

    const currentEffect = EFFECTS.find(e => e.id === selectedEffect);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#060606" />
            <SafeAreaView style={styles.safe}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={20} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Aplicar Efeito</Text>
                    <TouchableOpacity
                        style={[styles.genBtn, processing && styles.genBtnDisabled]}
                        onPress={handleApply}
                        disabled={processing}
                    >
                        {processing
                            ? <ActivityIndicator size="small" color="#FFF" />
                            : <Text style={styles.genBtnText}>Gerar ✨</Text>
                        }
                    </TouchableOpacity>
                </View>

                {/* Preview do vídeo */}
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: videoUri }}
                        style={styles.video}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        isMuted
                    />
                    {/* Badge do efeito selecionado */}
                    <View style={[styles.effectBadge, { backgroundColor: currentEffect.color + 'CC' }]}>
                        <Feather name={currentEffect.icon} size={12} color="#FFF" />
                        <Text style={styles.effectBadgeText}>{currentEffect.name}</Text>
                    </View>
                </View>

                {/* Loading overlay */}
                {processing && (
                    <View style={styles.loadingOverlay}>
                        <LinearGradient colors={['#060606EE', '#060606']} style={StyleSheet.absoluteFill} />
                        <View style={styles.loadingCard}>
                            <ActivityIndicator size="large" color="#FF416C" />
                            <Text style={styles.loadingTitle}>
                                {stage === 'uploading' ? '📤 Enviando vídeo...' : '🎬 Aplicando efeito...'}
                            </Text>
                            <Text style={styles.loadingSubtitle}>
                                {stage === 'uploading'
                                    ? 'Comprimido para upload rápido'
                                    : `Processando filtro "${currentEffect.name}"`
                                }
                            </Text>
                        </View>
                    </View>
                )}

                {/* Seletor de efeitos */}
                <View style={styles.effectsSection}>
                    <Text style={styles.sectionLabel}>Escolha o Efeito</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.effectsList}>
                        {EFFECTS.map((effect) => {
                            const isSelected = selectedEffect === effect.id;
                            return (
                                <TouchableOpacity
                                    key={effect.id}
                                    style={styles.effectItem}
                                    onPress={() => setSelectedEffect(effect.id)}
                                >
                                    <View style={[
                                        styles.effectThumb,
                                        isSelected ? { borderColor: effect.color, borderWidth: 3, backgroundColor: effect.color + '22' } : null
                                    ]}>
                                        <Feather
                                            name={effect.icon}
                                            size={26}
                                            color={isSelected ? effect.color : '#555'}
                                        />
                                    </View>
                                    <Text style={[styles.effectName, isSelected ? { color: effect.color } : null]}>
                                        {effect.name}
                                    </Text>
                                    {isSelected && (
                                        <Text style={[styles.effectDesc, { color: effect.color + 'AA' }]}>
                                            {effect.desc}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Botão de gerar (bottom) */}
                {!processing && (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity style={styles.generateBtn} onPress={handleApply}>
                            <LinearGradient
                                colors={[currentEffect.color, currentEffect.color + 'BB']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={styles.generateGrad}
                            >
                                <Feather name="cpu" size={20} color="#FFF" />
                                <Text style={styles.generateText}>Processar com "{currentEffect.name}"</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#060606' },
    safe: { flex: 1 },
    header: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
    },
    backBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center', alignItems: 'center',
    },
    headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
    genBtn: {
        backgroundColor: '#FF416C', paddingHorizontal: 16,
        paddingVertical: 8, borderRadius: 20, minWidth: 70, alignItems: 'center',
    },
    genBtnDisabled: { backgroundColor: '#333' },
    genBtnText: { color: '#FFF', fontWeight: '800', fontSize: 13 },
    videoContainer: {
        marginHorizontal: 20, height: 340,
        borderRadius: 24, overflow: 'hidden',
        backgroundColor: '#111', marginBottom: 4,
    },
    video: { width: '100%', height: '100%' },
    effectBadge: {
        position: 'absolute', top: 14, right: 14,
        flexDirection: 'row', alignItems: 'center', gap: 5,
        paddingHorizontal: 12, paddingVertical: 5,
        borderRadius: 20,
    },
    effectBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center', alignItems: 'center', zIndex: 100,
    },
    loadingCard: {
        backgroundColor: '#111', borderRadius: 28, padding: 36,
        alignItems: 'center', gap: 16,
        borderWidth: 1, borderColor: 'rgba(255,65,108,0.2)',
    },
    loadingTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
    loadingSubtitle: { color: '#888', fontSize: 13 },
    effectsSection: { marginTop: 16, paddingHorizontal: 20 },
    sectionLabel: { color: '#FFF', fontSize: 15, fontWeight: '700', marginBottom: 14 },
    effectsList: { paddingRight: 20, gap: 12 },
    effectItem: { width: 80, alignItems: 'center', marginRight: 8 },
    effectThumb: {
        width: 72, height: 72, borderRadius: 22,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 6,
        borderWidth: 1, borderColor: '#2A2A2A',
    },
    effectName: { color: '#888', fontSize: 11, fontWeight: '600' },
    effectDesc: { fontSize: 9, marginTop: 2, textAlign: 'center' },
    bottomBar: { padding: 20, paddingBottom: 32 },
    generateBtn: { borderRadius: 20, overflow: 'hidden' },
    generateGrad: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 10,
        paddingVertical: 18,
    },
    generateText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
