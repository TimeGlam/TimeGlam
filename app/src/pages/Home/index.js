import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import Header from '../../components/Header';
import theme from '../../styles/theme.json';
import util from '../../Util';

import {useDispatch, useSelector} from 'react-redux';
import {getSalaoS} from '../../store/modules/salao/actions';

import Servico from '../../Components/Servico';
import ModalAgendamento from '../../Components/ModalAgendamento/';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalao());
    dispatch(allServicos());
  }, []);

  return (
    <>
      <FlatList
        ListHeaderComponent={Header}
        data={finalServicos}
        renderItem={({item}) => <Servico key={item._id} item={item} />}
        keyExtractor={item => item._id}
      />
      <ModalAgendamento />
    </>
  );
};

export default Home;
