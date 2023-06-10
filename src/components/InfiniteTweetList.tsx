import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import Link from "next/link";

type Tweet = {
    id: string,
    content: string,
    createdAt: Date,
    likeCount: number,
    likedByMe: boolean,
    user: { id: string, image: string | null, name: string | null },
}

type InfiniteTweetListProps = {
    isLoading: boolean,
    isError: boolean,
    hasMore: boolean,
    fetchNewTweets: () => Promise<unknown>,
    tweets?: Tweet[];
}

export function InfiniteTweetList({ tweets, isError, isLoading, fetchNewTweets, hasMore }: InfiniteTweetListProps) {
    if (isLoading) return <h1>Loading..</h1>
    if (isError) return <h1>Error..</h1>

    if (tweets == null || tweets.length === 0) {
        return (
            <div>
                <h1 className="my-4 text-center text-2x1 text-gray-500">No Tweets</h1>
            </div>
        )
    }
    return (
        <ul>
            <InfiniteScroll
                dataLength={tweets.length}
                next={fetchNewTweets}
                hasMore={hasMore}
                loader={"Loading..."}
            >
                {tweets.map((tweet) => {
                    return <TweetCard key={tweet.id} {...tweet}/>;
                })}
            </InfiniteScroll>
        </ul>
    );
}
    function TweetCard({
        id,
        user,
        content,
        createdAt,
        likeCount,
        likedByMe
    }: Tweet) {
        const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short"
        });
        
        return (
            <li className="flex gap-4 border-b px-4 py-4">
                <Link href={`/profiles/${user.id}`}>
                    <ProfileImage src={user.image} />
                </Link>
                <div className="flex flex-grow flex-col">
                    <div className="flex gap-1">
                        <Link href={`/profiles/${user.id}`}
                        className="font-bold hover:underline focus-visible:underline">
                            {user.name}
                        </Link>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
                    </div>
                </div>
            </li>
        )
    }
