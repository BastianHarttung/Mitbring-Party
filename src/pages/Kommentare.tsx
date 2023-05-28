import React from 'react';
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";

const Kommentare = () => {
  const params = useParams();


  return (
    <div>
      Kommentare {params.id}
    </div>
  );
};

export default observer(Kommentare);
