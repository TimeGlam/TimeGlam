import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import Header from "../../Components/Header/index";
import Servico from "../../Components/Servico/index";
import ModalAgendamento from "../../Components/ModalAgendamento";

const Estabelecimento = () => {
  const { servicos, form } = useSelector((state) => state.estabelecimento);

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

export default Estabelecimento;
