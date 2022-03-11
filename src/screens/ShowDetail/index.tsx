import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { parse, format } from 'date-fns';

import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';

import {
  Container,
  TextBold,
  ShowImage,
  ShowDescription,
  ShowTitle,
  ShowReleaseDate,
  ShowOriginalTitle,
  ShowStreamingContainer,
  ShowStreaming,
  ShowCastContainer,
  ShowPersonContainer,
  ShowCast,
  ShowCastName,
  ShowCastCharacter,
  ShowGenres,
  ShowRating,
} from './styles';

import { IShow } from '@model/IShow';
import { IShowProvider } from '@model/IShowProvider';
import { IGenre } from 'src/model/IGenre';
import { ICast } from 'src/model/ICast';

import { getGenres, getCast } from '@services/tmdb';

import imageNotFound from '@assets/not-found.png';

type Props = {
  route: any;
};

type IShowWithProvider = {
  tvShow: IShow;
  showProvider: IShowProvider[];
};

const ShowDetail = ({ route }: Props) => {
  const { tvShow, showProvider }: IShowWithProvider = route.params;
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [cast, setCast] = useState<ICast[]>([]);

  useEffect(() => {
    const handleGenres = async () => {
      const genresFound = await getGenres();
      const genresFiltered = genresFound.filter((genre) =>
        tvShow.genre_ids.includes(genre.id)
      );
      setGenres(genresFiltered);
    };

    const handleCast = async () => {
      const castFound = await getCast(tvShow.id);
      setCast(castFound);
    };

    handleGenres();
    handleCast();
  }, [tvShow]);

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-1209664770627704/3570936542';

  return (
    <>
      <ScrollView>
        <Container>
          <ShowImage
            source={{
              uri: `https://image.tmdb.org/t/p/w400${tvShow.backdrop_path}`,
            }}
          />
          <ShowTitle>{tvShow.name}</ShowTitle>
          <ShowOriginalTitle>
            <TextBold>Título Original: </TextBold>
            {tvShow.original_name}
          </ShowOriginalTitle>
          <ShowReleaseDate>
            <TextBold>Lançamento: </TextBold>
            {format(
              parse(tvShow.first_air_date, 'yyyy-MM-dd', new Date()),
              'dd/MM/yyyy'
            )}
          </ShowReleaseDate>
          <ShowGenres>
            <TextBold>Gênero: </TextBold>
            {genres &&
              genres.map((genre, index) => (
                <ShowGenres key={genre.id}>
                  {(index ? ', ' : '') + genre.name}
                </ShowGenres>
              ))}
          </ShowGenres>
          <ShowDescription>{tvShow.overview}</ShowDescription>
          <ShowCastContainer>
            <ScrollView horizontal={true}>
              {cast &&
                cast.map((castMember, index) => (
                  <>
                    <ShowPersonContainer
                      key={castMember.name + '-' + castMember.id + '-' + index}>
                      {castMember.profile_path ? (
                        <ShowCast
                          source={{
                            uri: `https://image.tmdb.org/t/p/w300${castMember.profile_path}`,
                          }}
                        />
                      ) : (
                        <ShowCast source={imageNotFound} />
                      )}

                      <ShowCastName>{castMember.name}</ShowCastName>
                      <ShowCastCharacter>
                        {castMember.character}
                      </ShowCastCharacter>
                    </ShowPersonContainer>
                  </>
                ))}
            </ScrollView>
          </ShowCastContainer>
          <ShowRating>{`Score: ${tvShow.vote_average}/10`}</ShowRating>
          <ShowStreamingContainer>
            {showProvider &&
              showProvider.map((provider, index) => (
                <>
                  <ShowStreaming
                    key={
                      provider.provider_name +
                      '-' +
                      provider.provider_id +
                      '-' +
                      index
                    }
                    source={{
                      uri: `https://image.tmdb.org/t/p/w300${provider.logo_path}`,
                    }}
                  />
                </>
              ))}
          </ShowStreamingContainer>
        </Container>
      </ScrollView>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitId}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error(error)}
      />
    </>
  );
};

export default ShowDetail;
