import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  getEstabelecimento,
  allServicos,
} from "../../store/modules/salao/actions";

import Header from "../../Components/Header/index";
import Servico from "../../Components/Servico/index";
import ModalAgendamento from "../../Components/ModalAgendamento";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { servicos, form } = useSelector((state) => state.estabelecimento);

  useEffect(() => {
    dispatch(getEstabelecimento());
    dispatch(allServicos());
  }, []);

  const finalServicos =
    form.inputFiltro.length > 0
      ? servicos.filter((s) => {
          const titulo = s.titulo.toLowerCase().trim();
          const arrSearch = form.inputFiltro.toLowerCase().trim().split(" ");
          return arrSearch.every((w) => titulo.search(w) !== -1);
        })
      : servicos;

  return (
    <>
      <FlatList
        ListHeaderComponent={Header}
        data={finalServicos}
        renderItem={({ item }) => <Servico key={item._id} item={item} />}
        keyExtractor={(item) => item._id}
      />
      <ModalAgendamento />
    </>
  );
};

export default Home;
