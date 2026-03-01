import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const PreviewScreen = ({ navigation, route }) => {
    const { processedVideoUri } = route.params || {};

    const handleShare = async () => {
        try {
            if (!(await Sharing.isAvailableAsync())) {
                alert("Compartilhamento não disponível neste dispositivo");
                return;
            }
            await Sharing.shareAsync(processedVideoUri);
        } catch (error) {
            console.error(error);
        }
    };

    if (!processedVideoUri) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Feather name="alert-circle" size={48} color="#FF416C" />
                <Text style={styles.errorText}>Nenhum vídeo para exibir</Text>
                <TouchableOpacity style={styles.errorBtn} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.errorBtnText}>Voltar ao Início</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Vídeo fullscreen */}
            <Video
                source={{ uri: processedVideoUri }}
                style={StyleSheet.absoluteFill}
                resizeMode="contain"
                shouldPlay
                isLooping
            />

            {/* Overlay escuro gradient topo */}
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.topGrad}
            />
            {/* Overlay escuro gradient base */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.bottomGrad}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={22} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Preview</Text>
                    <View style={styles.liveDot} />
                </View>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Home')}>
                    <Feather name="home" size={22} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Área inferior de ações */}
            <View style={styles.footer}>
                {/* Botões laterais */}
                <View style={styles.sideActions}>
                    <TouchableOpacity style={styles.sideBtn} onPress={handleShare}>
                        <View style={styles.sideBtnCircle}>
                            <Feather name="download" size={22} color="#FFF" />
                        </View>
                        <Text style={styles.sideBtnLabel}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sideBtn}>
                        <View style={styles.sideBtnCircle}>
                            <Feather name="repeat" size={22} color="#FFF" />
                        </View>
                        <Text style={styles.sideBtnLabel}>Loop</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão principal de compartilhar */}
                <TouchableOpacity
                    style={styles.shareBtn}
                    onPress={() => navigation.navigate('Share', { videoUri: processedVideoUri })}
                    activeOpacity={0.85}
                >
                    <LinearGradient
                        colors={['#FF00ED', '#8B00FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.shareGrad}
                    >
                        <Feather name="share-2" size={20} color="#FFF" />
                        <Text style={styles.shareText}>Compartilhar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    centered: { justifyContent: 'center', alignItems: 'center', gap: 16 },
    errorText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    errorBtn: { backgroundColor: '#FF416C', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
    errorBtnText: { color: '#FFF', fontWeight: '700' },
    topGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },
    bottomGrad: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
    header: {
        position: 'absolute', top: 0, left: 0, right: 0,
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingTop: 52, paddingHorizontal: 20,
    },
    headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '900' },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF416C' },
    iconBtn: {
        width: 42, height: 42, borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center',
    },
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 20, paddingBottom: 44, gap: 16,
    },
    sideActions: { flexDirection: 'column', gap: 20 },
    sideBtn: { alignItems: 'center', gap: 6 },
    sideBtnCircle: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center',
    },
    sideBtnLabel: { color: '#FFF', fontSize: 11, fontWeight: '600' },
    shareBtn: { flex: 1, borderRadius: 28, overflow: 'hidden' },
    shareGrad: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 10,
        paddingVertical: 20,
    },
    shareText: { color: '#FFF', fontSize: 17, fontWeight: '800' },
});

export default PreviewScreen;
