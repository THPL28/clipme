import React, { useState, useCallback } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    SafeAreaView, ScrollView, Dimensions, StatusBar,
    RefreshControl, Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const STORIES = [
        { id: '1', name: 'Marcus_VFX', emoji: '👤', badge: 'LIVE', online: true },
        { id: '2', name: 'Sara.Edit', emoji: '👩', online: false },
        { id: '3', name: 'Alex.VFX', emoji: '🧑', online: true },
        { id: '4', name: 'Luna', emoji: '✨', online: false },
    ];

    const TRENDING = [
        {
            id: 't1',
            title: 'Glitch Effect',
            subtitle: '@urban_lens • 1.2M',
            emoji: '⚡',
            author: 'Alex.VFX'
        },
        {
            id: 't2',
            title: 'Retro Vibes',
            subtitle: '@vibe_master • 850K',
            emoji: '🎬',
            author: 'Luna'
        },
    ];

    const FEED = [
        {
            id: 'f1',
            author: 'Marcus_VFX',
            emoji: '👤',
            time: '2h ago',
            likes: 12400,
            comments: 340,
            shares: 420,
            text: 'Testing the new particle engine in ClipMe. The fluidity is insane! 🎨✨',
            liked: false,
            thumbnail: '⚡'
        },
        {
            id: 'f2',
            author: 'Sara.Design',
            emoji: '👩',
            time: '4h ago',
            likes: 8900,
            comments: 210,
            shares: 300,
            text: 'Tutorial: Cores Perfeitas em 5 Minutos 🎓',
            liked: false,
            thumbnail: '🎬'
        },
    ];

    const [feed, setFeed] = useState(FEED);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setFeed(FEED);
            setRefreshing(false);
        }, 800);
    }, []);

    const handleStoryPress = (story) => {
        if (story.online && story.badge === 'LIVE') {
            navigation.navigate('Live');
        } else {
            Alert.alert('Offline', `${story.name} está offline agora. Tente mais tarde!`);
        }
    };

    const handleCreateClip = () => {
        navigation.navigate('Record');
    };

    const handleTrendingPress = (trending) => {
        Alert.alert(
            'Tendência',
            `${trending.title} por ${trending.author}\n\n${trending.subtitle}`,
            [{ text: 'Ver ', onPress: () => { } }, { text: 'OK' }]
        );
    };

    const handlePostLike = (postId) => {
        setFeed(feed.map(post =>
            post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
        ));
    };

    const handlePostComment = (author) => {
        Alert.alert('Comentários', `Comentando em ${author} (em desenvolvimento)`);
    };

    const handlePostShare = (author) => {
        Alert.alert('Compartilhar', `Compartilhando post de ${author}`);
    };

    const handleProfilePress = () => {
        Alert.alert('Perfil', 'Tela de Perfil (em desenvolvimento)');
    };

    const handleSeeAllTrending = () => {
        Alert.alert('Tendências', 'Ver todas as tendências (em desenvolvimento)');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#060606" />
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <SafeAreaView style={styles.safe}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF416C" />}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.greeting}>Olá, criador 👋</Text>
                            <Text style={styles.brand}>ClipMe</Text>
                        </View>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.headerBtn} onPress={handleProfilePress}>
                                <LinearGradient colors={['#FF416C', '#FF4B2B']} style={styles.headerBtnGrad}>
                                    <Feather name="user" size={18} color="#FFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.headerBtn, { marginLeft: 8 }]} onPress={() => navigation.navigate('Live')}>
                                <LinearGradient colors={['#9d2bee', '#6b46c1']} style={styles.headerBtnGrad}>
                                    <Feather name="video" size={18} color="#FFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Create Button */}
                    <TouchableOpacity style={styles.createCard} onPress={handleCreateClip} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['rgba(255,65,108,0.1)', 'rgba(255,75,43,0.05)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.createGrad}
                        >
                            <View style={styles.createIcon}>
                                <MaterialIcons name="add" size={28} color="#FF416C" />
                            </View>
                            <View style={styles.createText}>
                                <Text style={styles.createTitle}>Criar novo clip</Text>
                                <Text style={styles.createSubtitle}>Selecione um vídeo da galeria</Text>
                            </View>
                            <MaterialIcons name="arrow-forward" size={20} color="#FF416C" />
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Stories */}
                    <View style={styles.storiesWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
                            {STORIES.map(story => (
                                <TouchableOpacity
                                    key={story.id}
                                    style={styles.storyItem}
                                    onPress={() => handleStoryPress(story)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[
                                        styles.storyThumb,
                                        story.online && styles.storyOnline,
                                        story.badge === 'LIVE' && styles.storyLive
                                    ]}>
                                        <Text style={styles.storyEmoji}>{story.emoji}</Text>
                                        {story.online && <View style={styles.onlineDot} />}
                                        {story.badge === 'LIVE' && (
                                            <View style={styles.liveBadge}>
                                                <Text style={styles.liveBadgeText}>●</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.storyLabel} numberOfLines={2}>{story.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Trending Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Tendências</Text>
                        <TouchableOpacity onPress={handleSeeAllTrending}>
                            <Text style={styles.sectionLink}>Ver tudo</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.trendingScroll}
                    >
                        {TRENDING.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.trendingCard}
                                onPress={() => handleTrendingPress(item)}
                                activeOpacity={0.85}
                            >
                                <LinearGradient
                                    colors={['#9d2bee22', '#FF416C11']}
                                    style={styles.trendingGrad}
                                >
                                    <View style={styles.trendingThumb}>
                                        <Text style={styles.trendingEmoji}>{item.emoji}</Text>
                                    </View>
                                    <View style={styles.trendingContent}>
                                        <Text style={styles.trendingTitle} numberOfLines={2}>{item.title}</Text>
                                        <Text style={styles.trendingSubtitle}>{item.subtitle}</Text>
                                    </View>
                                    <MaterialIcons name="arrow-forward" size={16} color="#FF416C" />
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* AI Tip Banner */}
                    <View style={styles.tipBannerWrapper}>
                        <LinearGradient
                            colors={['#9d2bee44', '#FF416C22']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.tipBanner}
                        >
                            <MaterialIcons name="auto-awesome" size={28} color="#9d2bee" />
                            <View style={styles.tipContent}>
                                <Text style={styles.tipTitle}>Dicas Rápidas</Text>
                                <Text style={styles.tipSubtitle}>Cores Perfeitas com IA em 1 tap ✨</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Feed */}
                    <View style={styles.feedWrapper}>
                        <Text style={styles.sectionTitle}>Últimos Clips</Text>

                        {feed.map(post => (
                            <View key={post.id} style={styles.postCard}>
                                <View style={styles.postHeader}>
                                    <View style={styles.postAuthor}>
                                        <Text style={styles.postAvatar}>{post.emoji}</Text>
                                        <View>
                                            <Text style={styles.postAuthorName}>{post.author}</Text>
                                            <Text style={styles.postTime}>{post.time}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <Feather name="more-horizontal" size={18} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.postText}>{post.text}</Text>

                                <View style={styles.postMedia}>
                                    <Text style={styles.postThumbnail}>{post.thumbnail}</Text>
                                </View>

                                <View style={styles.postStats}>
                                    <View style={styles.statGroup}>
                                        <Feather name="heart" size={14} color="#FF416C" />
                                        <Text style={styles.statText}>{(post.likes / 1000).toFixed(1)}K</Text>
                                    </View>
                                    <View style={styles.statGroup}>
                                        <Feather name="message-circle" size={14} color="#666" />
                                        <Text style={styles.statText}>{post.comments}</Text>
                                    </View>
                                    <View style={styles.statGroup}>
                                        <Feather name="share-2" size={14} color="#666" />
                                        <Text style={styles.statText}>{post.shares}</Text>
                                    </View>
                                </View>

                                <View style={styles.postActions}>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
                                        onPress={() => handlePostLike(post.id)}
                                    >
                                        <Feather
                                            name={post.liked ? 'heart' : 'heart'}
                                            size={18}
                                            color={post.liked ? '#FF416C' : '#666'}
                                            fill={post.liked ? '#FF416C' : 'none'}
                                        />
                                        <Text style={[styles.actionText, post.liked && styles.actionTextActive]}>
                                            {post.liked ? 'Liked' : 'Like'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
                                        onPress={() => handlePostComment(post.author)}
                                    >
                                        <Feather name="message-circle" size={18} color="#666" />
                                        <Text style={styles.actionText}>Comentar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
                                        onPress={() => handlePostShare(post.author)}
                                    >
                                        <Feather name="share-2" size={18} color="#666" />
                                        <Text style={styles.actionText}>Compartilhar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#060606' },
    glowTop: {
        position: 'absolute',
        top: -80,
        left: width / 2 - 150,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#FF416C22'
    },
    glowBottom: {
        position: 'absolute',
        bottom: 0,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#8B00FF11'
    },
    safe: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        marginBottom: 20
    },
    greeting: { color: '#888', fontSize: 13 },
    brand: { color: '#FFF', fontSize: 32, fontWeight: '900', marginTop: 2 },
    headerButtons: { flexDirection: 'row' },
    headerBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden' },
    headerBtnGrad: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    createCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden'
    },
    createGrad: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,65,108,0.2)'
    },
    createIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,65,108,0.15)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createText: { flex: 1, marginHorizontal: 12 },
    createTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
    createSubtitle: { color: '#888', fontSize: 12, marginTop: 2 },

    storiesWrapper: { paddingVertical: 12 },
    storiesScroll: { paddingHorizontal: 20 },
    storyItem: { alignItems: 'center', marginRight: 16 },
    storyThumb: {
        width: 64,
        height: 64,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#333',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        position: 'relative'
    },
    storyOnline: { borderColor: '#4ADE80' },
    storyLive: { borderColor: '#EF4444' },
    storyEmoji: { fontSize: 28 },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4ADE80',
        borderWidth: 2,
        borderColor: '#060606'
    },
    liveBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#060606'
    },
    liveBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    storyLabel: { marginTop: 6, fontSize: 10, color: '#CCC', textAlign: 'center', width: 70 },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 10
    },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
    sectionLink: { color: '#FF416C', fontSize: 13, fontWeight: '600' },

    trendingScroll: { paddingHorizontal: 20 },
    trendingCard: { marginRight: 12, borderRadius: 12, overflow: 'hidden' },
    trendingGrad: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        minWidth: 160,
        borderWidth: 1,
        borderColor: 'rgba(255,65,108,0.15)'
    },
    trendingThumb: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: 'rgba(255,65,108,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    trendingEmoji: { fontSize: 20 },
    trendingContent: { flex: 1, marginRight: 8 },
    trendingTitle: { color: '#FFF', fontSize: 13, fontWeight: '700' },
    trendingSubtitle: { color: '#888', fontSize: 10, marginTop: 2 },

    tipBannerWrapper: { paddingHorizontal: 20, paddingVertical: 12 },
    tipBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(157,46,238,0.2)'
    },
    tipContent: { flex: 1, marginLeft: 12 },
    tipTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
    tipSubtitle: { color: '#AAA', fontSize: 12, marginTop: 2 },

    feedWrapper: { paddingHorizontal: 20, paddingVertical: 8 },
    postCard: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)'
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    postAuthor: { flexDirection: 'row', alignItems: 'center' },
    postAvatar: { fontSize: 32, marginRight: 10 },
    postAuthorName: { color: '#FFF', fontSize: 13, fontWeight: '700' },
    postTime: { color: '#888', fontSize: 11, marginTop: 2 },
    postText: { color: '#DDD', fontSize: 13, lineHeight: 18, marginBottom: 10 },
    postMedia: {
        height: 120,
        borderRadius: 10,
        backgroundColor: 'rgba(255,65,108,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,65,108,0.15)'
    },
    postThumbnail: { fontSize: 44 },
    postStats: { flexDirection: 'row', gap: 16, marginBottom: 10 },
    statGroup: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statText: { color: '#888', fontSize: 11 },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)'
    },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 },
    actionText: { color: '#888', fontSize: 12, fontWeight: '600' },
    actionTextActive: { color: '#FF416C' }
});
