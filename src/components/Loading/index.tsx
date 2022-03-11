import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Message } from './styles';

export default function Loading({ ...props }) {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fa3e82" />
      <Message>{props.title ? props.title : 'Carregando...'}</Message>
    </Container>
  );
}
