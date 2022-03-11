import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextBold = styled.Text`
  font-weight: bold;
`;

export const ShowImage = styled.Image`
  width: 200px;
  height: 250px;
  margin: 16px auto;
  border-radius: 10px;
`;

export const ShowTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  text-align: center;
  margin: 8px auto;
`;

export const ShowOriginalTitle = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const ShowDescription = styled.Text`
  font-size: 16px;
  width: 80%;
  margin: 8px auto;
`;

export const ShowReleaseDate = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const ShowGenres = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const ShowCastContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 16px auto;
  width: 80%;
`;

export const ShowPersonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  padding: 4px;
`;

export const ShowCast = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: auto 4px;
`;

export const ShowCastName = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

export const ShowCastCharacter = styled.Text`
  font-size: 10px;
`;

export const ShowRating = styled.Text`
  font-size: 12px;
  font-weight: bold;
  width: 80%;
  text-align: center;
`;

export const ShowStreamingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  flex-wrap: wrap;
  width: 80%;
`;

export const ShowStreaming = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  margin: auto 4px;
`;
