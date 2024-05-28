import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import BottonSheet from 'reanimated-bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import ModalHeader from './header';
import DateTime from '../ModalAgendamento/dateTime';
import EspecialistasPicker from './especialistas';
import DataTime from './dateTime';
import {ScrollView} from 'react-native-gasture-handler';
import PaymentPicker from './especialistas/payment';

const ModalAgendamento = () => {
  return (
    <BottonSheet
      initialSnap={1}
      snapPoints={[0, 70, Dimensions.get('Window').height - 30]}
      renderContent={() => (
        <ScrollView stickyHeaderIndices={[0]} style={{BackgroundColor: '#fff'}}>
          <ModalHeader />
          <Resume />
          <DataTime />
          <EspecialistasPicker />
          <PaymentPicker />
          <Box hasPadding>
            <Button icon="check" background="primary" mode="contained" block>
              Confirmar meu Agendamento
            </Button>
          </Box>
        </ScrollView>
      )}
    />
  );
};
export default ModalAgendamento;
