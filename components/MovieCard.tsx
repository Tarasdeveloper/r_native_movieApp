import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const MovieCard = ({
    id,
    poster_path,
    title,
    vote_average,
    release_date,
}: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZky7vTGIH53aR29AGnfegcC3Lg_EGVy0QUg&s',
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text
                    className="text-white text-sm font-bold mt-2"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-white text-xs font-bold uppercase">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split('-')[0] || 'N/A'}
                    </Text>
                    {/* <Text className="text-xs text-light-300 font-medium uppercase">
                        Movie
                    </Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    );
};
export default MovieCard;
