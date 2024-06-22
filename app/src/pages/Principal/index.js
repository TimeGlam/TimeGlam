import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allEstabelecimentos } from "../../store/modules/salao/actions";
import HeaderPrincipal from "../../Components/HeaderPrincipal";
import Estabelecimento from "../../Components/Estabelecimento";

const OutraPagina = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form, estabelecimentos } = useSelector(
    (state) => state.estabelecimento
  );

  // console.log("estabelecimentos principal:", estabelecimentos);

  useEffect(() => {
    dispatch(allEstabelecimentos());
  }, [dispatch]);

  const finalEstabelecimentos =
    form.inputFiltro.length > 0
      ? estabelecimentos.filter((e) => {
          const nome = e.nome.toLowerCase().trim();
          const arrSearch = form.inputFiltro.toLowerCase().trim().split(" ");
          return arrSearch.every((w) => nome.search(w) !== -1);
        })
      : estabelecimentos;

  return (
    <>
      <FlatList
        ListHeaderComponent={HeaderPrincipal}
        data={finalEstabelecimentos}
        renderItem={({ item }) => (
          <Estabelecimento key={item._id} item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};

export default OutraPagina;
