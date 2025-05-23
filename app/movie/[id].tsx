import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import {
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MovieInfoProps {
    label: string;
    value?: number | string | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || 'N/A'}
        </Text>
    </View>
);

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const {
        data: movie,
        loading,
        error,
    } = useFetch(() => fetchMovieDetails(id as string));

    // if (!movie) return null;
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-primary">
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (error || !movie) {
        return (
            <View className="flex-1 justify-center items-center bg-primary">
                <Text className="text-white">Ошибка загрузки данных</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View>
                    {movie?.poster_path && (
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                            }}
                            className="w-full h-[550px]"
                            resizeMode="stretch"
                        />
                    )}
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">
                        {movie?.title}
                    </Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.release_date?.split('-')[0]}
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.runtime}m
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    <MovieInfo label="OverView" value={movie?.overview} />
                    <MovieInfo
                        label="Genres"
                        value={
                            movie?.genres?.map((g) => g.name).join(' - ') ||
                            'N/A'
                        }
                    />
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={`$${movie?.budget / 1_000_000} million`}
                        />

                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round(
                                movie?.revenue / 1_000_000
                            )} mil`}
                        />
                    </View>
                    <MovieInfo
                        label="Production Companies"
                        value={
                            movie?.production_companies
                                ?.map((c) => c.name)
                                .join(' - ') || 'N/A'
                        }
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                className="absolute bottom-14 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">
                    Go back
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default MovieDetails;
