import React from 'react';
import styled from 'styled-components';

const Report = styled.div`
  position: absolute;
  width: 25rem;
  right: 0;
  left: 0;
  top: 200px;
  margin: auto;
  border-color: rgba(0,0,0,.0784314);
  border-style: solid;
  border-width: .67px;
  border-radius: 3px;
  background-color: white;
  z-index: 1003;
  padding-bottom: 16px;
`;

const ReportHeader = styled.h4`
  font-size: 1.25rem;
  padding-left: 16px;
  display: block;
  font-weight: bold;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
`;

const Unrelated = styled.button`
  display: block;
  font-size: 16px;
  font-weight: 400;
  width: 90%;
  margin: 5px auto;
  padding: .6rem 1.75rem;
  text-align: center;
  border-radius: 3px;
  color: white;
  background-color: rgb(97, 189, 219);
`;

const Inappropriate = styled.button`
  display: block;
  font-size: 16px;
  font-weight: 400;
  width: 90%;
  margin: 5px auto;
  padding: .6rem 1.75rem;
  text-align: center;
  border-radius: 3px;
  color: white;
  background-color: rgb(97, 189, 219);
`;

const DontLike = styled.button`
  display: block;
  font-size: 16px;
  font-weight: 400;
  width: 90%;
  margin: 5px auto;
  padding: .6rem 1.75rem;
  text-align: center;
  border-radius: 3px;
  color: white;
  background-color: rgb(97, 189, 219);
`;

const Cancel = styled.button`
  display: block;
  font-size: 16px;
  font-weight: 400;
  width: 90%;
  margin: 5px auto;
  padding: .6rem 1.75rem;
  text-align: center;
  border-radius: 3px;
  background-color: white;
  color: rgb(97, 189, 219);
  border: 0;
`;

class Flag extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <Report className='report'>
        <ReportHeader className='report-header'>Report a photo problem</ReportHeader>
        <Unrelated onClick={(e) => this.props.postReport(e)} className='unrelated' type='button'>Unrelated to restaurant</Unrelated>
        <Inappropriate onClick={(e) => this.props.postReport(e)} className='inappropriate' type='button'>Inappropriate content</Inappropriate>
        <DontLike onClick={(e) => this.props.postReport(e)} className='dont-like' type='button'>I don't like this photo</DontLike>
        <Cancel onClick={(e) => this.props.report(e)} className='cancel' type='button'>Cancel</Cancel>
      </Report>
    )
  }
}

export default Flag;