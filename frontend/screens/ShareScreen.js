import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

const ShareScreen = ({ navigation, route }) => {
    const { videoUri } = route.params || {};

    const SHARE_OPTIONS = [
        { id: 'insta', name: 'Instagram', color: '#E1306C', icon: 'instagram' },
        { id: 'tiktok', name: 'TikTok', color: '#000000', icon: 'send' },
        { id: 'whatsapp', name: 'WhatsApp', color: '#25D366', icon: 'message-circle' },
        { id: 'more', name: 'Mais', color: '#333', icon: 'more-horizontal' },
    ];

    const handleShare = async () => {
        try {
            if (videoUri && await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(videoUri);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0F0F0F', '#1A1A1A']} style={styles.background} />

            <View style={styles.content}>
                <View style={styles.successIcon}>
                    <Feather name="check" color="#FFF" size={40} />
                </View>
                <Text style={styles.title}>Vídeo Pronto!</Text>
                <Text style={styles.subtitle}>Onde você quer postar sua obra-prima?</Text>

                <View style={styles.optionsGrid}>
                    {SHARE_OPTIONS.map((opt) => (
                        <TouchableOpacity key={opt.id} style={styles.optionBtn} onPress={handleShare}>
                            <View style={[styles.iconBox, { backgroundColor: opt.color }]}>
                                <Feather name={opt.icon} color="#FFF" size={24} />
                            </View>
                            <Text style={styles.optionName}>{opt.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.doneText}>Voltar ao Início</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F0F0F' },
    background: { ...StyleSheet.absoluteFillObject },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
    successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FF00ED', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { color: '#FFF', fontSize: 32, fontWeight: '900', marginBottom: 10 },
    subtitle: { color: '#AAA', fontSize: 16, textAlign: 'center', marginBottom: 40 },
    optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 50 },
    optionBtn: { alignItems: 'center', width: 80 },
    iconBox: { width: 60, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    optionName: { color: '#FFF', fontSize: 12, fontWeight: '600' },
    doneButton: { paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, backgroundColor: '#2A2A2A', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    doneText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

export default ShareScreen;
