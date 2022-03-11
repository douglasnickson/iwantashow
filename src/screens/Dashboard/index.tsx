import React, { useState, useEffect } from 'react';
// import {
//   BannerAd,
//   TestIds,
//   BannerAdSize,
//   useInterstitialAd,
// } from '@react-native-admob/admob';

import { Container, Message, ComboBoxContainer, ComboBox } from './styles';

import Button from '@components/Button';
import Logo from '@components/Logo';
import Loading from '@components/Loading';

import { getRandomItems } from '@utils/Utils';

import {
  getTopRatedShows,
  getPopularShows,
  getTrendingWeekShows,
  getShowProvider,
} from '@services/tmdb';

import { IShowProvider } from '@model/IShowProvider';
import { Alert } from 'react-native';
import { IShow } from '@model/IShow';

type Props = {
  navigation: any;
};

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-1209664770627704/8919504132';

// const adIntersticialUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-1209664770627704/3197894852';

let show: IShow;
let showProvider: IShowProvider[] = [];

const Dashboard = ({ navigation }: Props) => {
  const [streaming, setStreaming] = useState('');
  const [loading, setLoading] = useState(false);

  // const { adLoaded, adDismissed, show } = useInterstitialAd(
  //   adIntersticialUnitId,
  //   {
  //     requestOptions: {
  //       requestNonPersonalizedAdsOnly: true,
  //     },
  //   }
  // );

  const handleStreaming = (value: string) => {
    setStreaming(value);
  };

  const handleShow = async () => {
    if (!streaming) {
      Alert.alert('Ocorreu um erro', 'Selecione uma opção de streaming!');
      return;
    }

    try {
      setLoading(true);
      let page = 1;

      const shows = [];
      while (page <= 50) {
        const topRatedShows = await getTopRatedShows(page);
        const popularShows = await getPopularShows(page);
        const trendingWeekShows = await getTrendingWeekShows(page);
        shows.push(...topRatedShows, ...popularShows, ...trendingWeekShows);
        page++;
      }
      const uniqueShows = [
        ...new Map(shows.map((item) => [item.id, item])).values(),
      ];

      let count = 0;
      while (count < uniqueShows.length) {
        const randomShow = getRandomItems(uniqueShows, 1);
        const providersFound = await getShowProvider(randomShow[0].id);
        if (providersFound.length > 0) {
          const showProviders = providersFound.filter(
            (provider) => provider.provider_name === streaming
          );
          if (showProviders.length > 0) {
            console.log(randomShow[0]);

            show = randomShow[0];
            showProvider.push(...providersFound);
            break;
          }
          count++;
        }
      }

      if (!show) {
        Alert.alert('Ocorreu um erro', 'Nenhum Tv Show encontrado!');
        setLoading(false);
        return;
      }

      setLoading(false);
      setStreaming('');

      // if (adLoaded) {
      //   show();
      // } else {
      //   navigation.navigate('MovieDetail', { movie, movieProvider });
      // }
      navigation.navigate('ShowDetail', { show, showProvider });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (adDismissed) {
  //     navigation.navigate('MovieDetail', { movie, movieProvider });
  //   }
  // }, [adDismissed, navigation]);

  return (
    <Container>
      <Logo />
      <Message>
        Selecione um serviço de streaming e clique em pesquisar para obter uma
        recomendação.
      </Message>
      <ComboBoxContainer>
        <ComboBox
          selectedValue={streaming}
          mode="dropdown"
          onValueChange={(itemValue: any) => handleStreaming(itemValue)}>
          <ComboBox.Item label="Selecione uma opção" value="" />
          <ComboBox.Item label="Apple Tv" value="Apple TV Plus" />
          <ComboBox.Item label="Claro video" value="Claro video" />
          <ComboBox.Item label="Disney +" value="Disney Plus" />
          <ComboBox.Item label="Globo Play" value="Globo Play" />
          <ComboBox.Item label="HBO Max" value="HBO Max" />
          <ComboBox.Item label="Netflix" value="Netflix" />
          <ComboBox.Item label="Oi Play" value="Oi Play" />
          <ComboBox.Item label="Prime Vídeo" value="Amazon Prime Video" />
          <ComboBox.Item label="Paramount +" value="Paramount Plus" />
          <ComboBox.Item label="Star +" value="Star Plus" />
          <ComboBox.Item label="Telecine Play" value="Telecine Play" />
        </ComboBox>
      </ComboBoxContainer>
      <Button disabled={loading} onPress={handleShow}>
        PESQUISAR
      </Button>
      {loading && <Loading title={'Buscando...'} />}
      {/* <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitId}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error(error)}
      /> */}
    </Container>
  );
};

export default Dashboard;
