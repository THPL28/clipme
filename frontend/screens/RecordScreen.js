import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    SafeAreaView, ActivityIndicator, StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function RecordScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const pickVideo = async () => {
        try {
            setLoading(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Precisamos de permissão para acessar sua galeria!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['videos'],
                allowsEditing: true,
                videoMaxDuration: 30, // limita a 30 segundos
                quality: 0.5,         // comprime para 50% — MUITO mais rápido!
            });

            if (!result.canceled) {
                navigation.navigate('Effects', { videoUri: result.assets[0].uri });
            }
        } catch (e) {
            console.error(e);
            alert("Erro ao selecionar vídeo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Efeito de grade no fundo */}
            <View style={styles.gridOverlay} />

            <SafeAreaView style={styles.safe}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={20} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Selecionar Clip</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Área principal */}
                <View style={styles.mainArea}>
                    {/* Círculo animado */}
                    <View style={styles.circleOuter}>
                        <View style={styles.circleMiddle}>
                            <LinearGradient
                                colors={['#FF416C', '#FF4B2B']}
                                style={styles.circleInner}
                            >
                                <Feather name="film" size={44} color="#FFF" />
                            </LinearGradient>
                        </View>
                    </View>

                    <Text style={styles.title}>Seu Vídeo Aqui</Text>
                    <Text style={styles.subtitle}>
                        Escolha um vídeo da galeria e{'\n'}transforme em um clip mágico
                    </Text>

                    {/* Tags de info */}
                    <View style={styles.tags}>
                        <View style={styles.tag}>
                            <Feather name="clock" size={12} color="#FF416C" />
                            <Text style={styles.tagText}>Máx. 30s</Text>
                        </View>
                        <View style={styles.tag}>
                            <Feather name="zap" size={12} color="#FF416C" />
                            <Text style={styles.tagText}>Upload Rápido</Text>
                        </View>
                        <View style={styles.tag}>
                            <Feather name="star" size={12} color="#FF416C" />
                            <Text style={styles.tagText}>4 Efeitos</Text>
                        </View>
                    </View>
                </View>

                {/* Botão de ação */}
                <View style={styles.bottomArea}>
                    {loading ? (
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color="#FF416C" />
                            <Text style={styles.loadingText}>Carregando vídeo...</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.btnWrapper} onPress={pickVideo} activeOpacity={0.85}>
                            <LinearGradient
                                colors={['#FF416C', '#FF4B2B']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.btn}
                            >
                                <Feather name="image" size={22} color="#FFF" />
                                <Text style={styles.btnText}>Abrir Galeria</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.hint}>Vídeos curtos processam mais rápido ⚡</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#060606' },
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        opacity: 0.03,
    },
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
    mainArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
    circleOuter: {
        width: 200, height: 200, borderRadius: 100,
        backgroundColor: 'rgba(255, 65, 108, 0.06)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 36,
    },
    circleMiddle: {
        width: 160, height: 160, borderRadius: 80,
        backgroundColor: 'rgba(255, 65, 108, 0.10)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255, 65, 108, 0.2)',
    },
    circleInner: {
        width: 110, height: 110, borderRadius: 55,
        justifyContent: 'center', alignItems: 'center',
    },
    title: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
    subtitle: { color: '#666', fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
    tags: { flexDirection: 'row', gap: 10 },
    tag: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: 'rgba(255,65,108,0.1)',
        paddingHorizontal: 12, paddingVertical: 6,
        borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,65,108,0.2)',
    },
    tagText: { color: '#FF416C', fontSize: 11, fontWeight: '600' },
    bottomArea: { padding: 28, paddingBottom: 40, alignItems: 'center' },
    btnWrapper: { width: '100%', borderRadius: 18, overflow: 'hidden', marginBottom: 14 },
    btn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 12, paddingVertical: 18,
    },
    btnText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
    loadingBox: { alignItems: 'center', gap: 14, marginBottom: 14 },
    loadingText: { color: '#FFF', fontWeight: '600' },
    hint: { color: '#444', fontSize: 13 },
});
