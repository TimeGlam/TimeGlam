import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allEstabelecimentos } from "../../store/modules/salao/actions";
import HeaderHome from "../../Components/HeaderHome";
import Estabelecimentos from "../../Components/Estabelecimentos";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form, estabelecimentos } = useSelector(
    (state) => state.estabelecimento
  );

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
        ListHeaderComponent={HeaderHome}
        data={finalEstabelecimentos}
        renderItem={({ item }) => (
          <Estabelecimentos
            key={item._id}
            item={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};

export default Home;
