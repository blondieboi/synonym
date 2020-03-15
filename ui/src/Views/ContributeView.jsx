import React from 'react';
import ViewHeader from '../Components/ViewHeader';
import ContributeInput from '../Components/ContributeInput';
import '../Styles/Views.scss';
import '../Styles/AddView.scss';

const ContributeView = () => (
  <div className="view">
    <ViewHeader
      title="Add synonyms"
      subtitle="because you surely know more than me."
    />
    <ContributeInput />
  </div>
);

export default ContributeView;
