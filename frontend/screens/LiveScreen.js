import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Alert,
    StatusBar,
    Animated,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LiveScreen({ navigation }) {
    const [messages, setMessages] = useState([
        { id: '1', user: 'Sarah_M', emoji: '👤', text: 'Loving the vibe tonight! 🎸', isMe: false },
        { id: '2', user: 'DJ_Hype', emoji: '👨', text: 'Audio quality is 10/10! 🔥🔥🔥', isMe: false },
        { id: '3', user: 'System', text: 'Marcus sent 500 Credits! 💎', type: 'tip', isMe: false },
    ]);

    const [messageInput, setMessageInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(true);
    const [viewers, setViewers] = useState(1248);
    const [reactions, setReactions] = useState([]);
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const scrollRef = useRef(null);
    const reactionCountRef = useRef(0);

    const REACTION_EMOJIS = ['🔥', '💖', '✨', '🙌'];

    useEffect(() => {
        // Simular viewers aumento
        const interval = setInterval(() => {
            setViewers(prev => prev + Math.floor(Math.random() * 10 - 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                user: 'You',
                emoji: '👤',
                text: messageInput,
                isMe: true,
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
            setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        }
    };

    const handleReaction = (emoji) => {
        const newReaction = {
            id: reactionCountRef.current++,
            emoji,
            timestamp: Date.now(),
        };
        setReactions([...reactions, newReaction]);

        // Remove reaction after 100ms
        setTimeout(() => {
            setReactions(prev => prev.filter(r => r.id !== newReaction.id));
        }, 1000);

        // Add random message to chat about the reaction
        if (Math.random() > 0.3) {
            const names = ['Alex', 'Sarah', 'Marcus', 'Luna', 'Jordan'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const reactionMessage = {
                id: Date.now().toString(),
                user: randomName,
                emoji: '👤',
                text: `Sent ${emoji}`,
                isMe: false,
            };
            setMessages([...messages, reactionMessage]);
        }
    };

    const handleEndLive = () => {
        Alert.alert(
            'Encerrar transmissão?',
            'Tem certeza que deseja finalizar a live?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Encerrar',
                    style: 'destructive',
                    onPress: () => {
                        setIsStreaming(false);
                        Alert.alert('Live finalizada!', 'Seu vídeo foi salvo com sucesso.');
                        setTimeout(() => navigation.goBack(), 1500);
                    },
                },
            ]
        );
    };

    const handleAddGuest = () => {
        Alert.alert('Adicionar convidado', 'Convite enviado para um usuário aleatório');
    };

    const handleSettings = () => {
        Alert.alert('Configurações', 'Qualidade: 1080p\nBitrate: 5Mbps\nEncoder: H.264');
    };

    if (!isStreaming) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.endingScreen}>
                    <MaterialIcons name="check-circle" size={80} color="#4ADE80" />
                    <Text style={styles.endingTitle}>Live Finalizada!</Text>
                    <Text style={styles.endingText}>Obrigado por transmitir</Text>
                    <TouchableOpacity
                        style={styles.endingBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.endingBtnText}>Voltar ao Início</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1022" />

            {/* Background video feed */}
            <LinearGradient
                colors={['#9d2bee44', '#FF416C22']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                <View style={styles.videoPlaceholder}>
                    <MaterialIcons name="videocam" size={64} color="#FF416C22" />
                </View>
            </LinearGradient>

            {/* Header */}
            <SafeAreaView style={styles.headerOverlay} pointerEvents="none">
                <View style={styles.headerLeft}>
                    <View style={styles.avatarWrapper}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                        <View style={styles.liveIndicator} />
                    </View>
                    <View>
                        <Text style={styles.streamTitle}>Live Transmission</Text>
                        <Text style={styles.streamSub}>@ClipCreator</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.viewerCount}>
                        <Feather name="eye" size={14} color="#9d2bee" />
                        <Text style={styles.viewerCountText}>{viewers}</Text>
                    </View>
                </View>
            </SafeAreaView>

            {/* Floating Reactions */}
            {reactions.map(reaction => (
                <Animated.Text
                    key={reaction.id}
                    style={[
                        styles.floatingReaction,
                        {
                            opacity: new Animated.Value(1),
                            transform: [
                                { translateY: new Animated.Value(0) },
                            ],
                        },
                    ]}
                >
                    {reaction.emoji}
                </Animated.Text>
            ))}

            {/* Guest Preview */}
            <TouchableOpacity
                style={styles.guestBox}
                onPress={handleAddGuest}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#9d2bee44', '#FF416C22']}
                    style={styles.guestGrad}
                >
                    <MaterialIcons name="person-add" size={24} color="#9d2bee" />
                    <Text style={styles.guestText}>Guest</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Chat Overlay */}
            <View style={styles.chatContainer} pointerEvents="box-none">
                <ScrollView
                    ref={scrollRef}
                    style={styles.chatScroll}
                    contentContainerStyle={{ paddingBottom: 8 }}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map(msg => {
                        if (msg.type === 'tip') {
                            return (
                                <View key={msg.id} style={styles.tipMessage}>
                                    <MaterialIcons name="stars" size={14} color="#9d2bee" />
                                    <Text style={styles.tipText}>{msg.text}</Text>
                                </View>
                            );
                        }
                        return (
                            <View
                                key={msg.id}
                                style={[
                                    styles.chatMessage,
                                    msg.isMe && styles.chatMessageMe,
                                ]}
                            >
                                <Text style={styles.messageEmoji}>{msg.emoji}</Text>
                                <View style={styles.messageBubble}>
                                    <Text style={styles.messageUser}>{msg.user}</Text>
                                    <Text style={styles.messageText}>{msg.text}</Text>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Bottom Controls Bar */}
            <View style={styles.bottomBar}>
                {/* Control Buttons */}
                <View style={styles.controlGroup}>
                    <TouchableOpacity
                        style={[styles.controlBtn, !micOn && styles.controlBtnOff]}
                        onPress={() => setMicOn(!micOn)}
                    >
                        <MaterialIcons
                            name={micOn ? 'mic' : 'mic-off'}
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.controlBtn, !cameraOn && styles.controlBtnOff]}
                        onPress={() => setCameraOn(!cameraOn)}
                    >
                        <MaterialIcons
                            name={cameraOn ? 'videocam' : 'videocam-off'}
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={handleSettings}
                    >
                        <MaterialIcons name="settings" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Chat Input */}
                <View style={styles.inputGroup}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Say something..."
                            placeholderTextColor="#888"
                            style={styles.chatInput}
                            value={messageInput}
                            onChangeText={setMessageInput}
                            onSubmitEditing={handleSendMessage}
                        />
                        <TouchableOpacity
                            style={styles.sendBtn}
                            onPress={handleSendMessage}
                        >
                            <MaterialIcons name="send" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Reaction & End Buttons */}
                <View style={styles.actionGroup}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.reactionBtn]}
                        onPress={() =>
                            handleReaction(
                                REACTION_EMOJIS[
                                    Math.floor(Math.random() * REACTION_EMOJIS.length)
                                ]
                            )
                        }
                    >
                        <MaterialIcons name="favorite" size={18} color="#FF416C" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.reactionBtn]}
                        onPress={() => handleReaction('😂')}
                    >
                        <Text style={styles.reactionEmoji}>😂</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.endBtn]}
                        onPress={handleEndLive}
                    >
                        <Feather name="power" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1022' },
    background: { ...StyleSheet.absoluteFillObject },
    videoPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: 'rgba(26,16,34,0.6)',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    avatarWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#9d2bee',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'rgba(157,46,238,0.1)',
        position: 'relative',
    },
    avatarEmoji: { fontSize: 20 },
    liveIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: '#1a1022',
    },
    streamTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
    streamSub: { color: '#AAA', fontSize: 11, marginTop: 2 },
    headerRight: { alignItems: 'center' },
    viewerCount: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    viewerCountText: { color: '#fff', fontSize: 12, fontWeight: '700' },

    floatingReaction: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: 'bold',
    },

    guestBox: {
        position: 'absolute',
        top: 80,
        right: 16,
        width: 90,
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        zIndex: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    guestGrad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    guestText: { color: '#9d2bee', fontSize: 11, fontWeight: '700' },

    chatContainer: {
        position: 'absolute',
        left: 16,
        top: 80,
        width: width - 130,
        maxHeight: height * 0.35,
        zIndex: 10,
    },
    chatScroll: {},
    chatMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 8,
        borderRadius: 10,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    chatMessageMe: {
        backgroundColor: 'rgba(255,65,108,0.2)',
        borderColor: 'rgba(255,65,108,0.3)',
        alignSelf: 'flex-end',
        marginRight: 0,
        marginLeft: 'auto',
    },
    messageEmoji: { fontSize: 18, marginRight: 6, marginTop: 1 },
    messageBubble: { flex: 1 },
    messageUser: { fontSize: 10, fontWeight: '700', color: '#DDD' },
    messageText: { fontSize: 11, color: '#FFF', marginTop: 2 },
    tipMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(157,46,238,0.2)',
        padding: 6,
        borderRadius: 8,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: 'rgba(157,46,238,0.3)',
        gap: 6,
    },
    tipText: { fontSize: 10, color: '#fff', fontWeight: '600' },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(26,16,34,0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingBottom: 16,
        gap: 8,
    },

    controlGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    controlBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlBtnOff: { backgroundColor: 'rgba(239,68,68,0.3)' },

    inputGroup: {
        flex: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 24,
        paddingHorizontal: 12,
        height: 44,
    },
    chatInput: {
        flex: 1,
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },
    sendBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#9d2bee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reactionBtn: {
        backgroundColor: 'rgba(255,65,108,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255,65,108,0.3)',
    },
    reactionEmoji: { fontSize: 18 },
    endBtn: {
        backgroundColor: 'rgba(239,68,68,0.5)',
        marginLeft: 'auto',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.6)',
    },

    // Ending Screen
    endingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#060606',
    },
    endingTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
    endingText: { color: '#888', fontSize: 14 },
    endingBtn: {
        backgroundColor: '#FF416C',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 24,
        marginTop: 12,
    },
    endingBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
