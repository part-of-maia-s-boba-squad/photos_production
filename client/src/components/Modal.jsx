import React from 'react';
import Flag from './Flag.jsx';
import styled from 'styled-components';

const ModalDiv = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1001;
`;

const ModalContent = styled.img`
  display: block;
  margin: 0px auto 0px auto;
  width: 590px;  
  height: 590px;
  object-fit: cover;
`;

const ModalContentHolder = styled.div`
  display: block;
  margin: 30px auto 0px auto;
  width: 590px;  
  height: 590px;
`;

const ModalFooter = styled.div`
  margin: 8px 0px;
`;

const CloseBtn = styled.span`
  font-family: icons;
  display: inline;
  font-style: normal;
  font-weight: 200;
  font-variant: normal;
  color: #6f737b;
  float: right;
  padding: 25px;
  font-size: 50px;
`;

const CircleHolder = styled.div`
  margin: 8px 6px 0px 0px;
  float: left;
`;

const TextHolder = styled.div`
  float: left;
  padding: 8px 0px 0px 0px;
`;

const Text = styled.div`
  display: block;
  padding: 4px 0px 0px 0px;
  margin: 8px 0px 0px 0px;
  color: white;
  font-size: 16px;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 500;
`;

const DinedOn = styled.div`
  display: block;
  padding: 4px 0px 0px 0px;
  color: white;
  font-size: 16px;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 100;
`;

const Circle = styled.p`
  margin: auto;
  width: 50px;
  height: 50px; 
  border-radius: 50%;
  border: 1px solid black;
  background: #56D7D9;
  color: white;
  font-family: arial;
  font-size: 15px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
`;

const LeftArrow = styled.a`
  color: #91949a;
  font-size: 25px;
  position: relative;
  top: 50%;
  font-family: icons;
`;

const RightArrow = styled.a`
  color: #91949a;
  font-size: 25px;
  position: relative;
  display: block;
  margin-right: auto;
  top: 50%;
  font-family: icons;
`;

const RightArrowDiv = styled.div`
  margin: 30px 0px 30px 0px;
  width: 20px;
`;

const FlagIcon = styled.svg`
  margin: 8px;
  color: white;
  font-family: BrandonText;
  float: right;
`;

const OuterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 660px;
  height: 660px;
`;

class Modal extends React.Component{
  constructor(props){
    super(props);
    const initialPhoto = this.props.modalImage;
    
    this.state = {
      currentPhoto: initialPhoto,
      report: false
    };
    this.nextImage = this.nextImage.bind(this);
    this.report = this.report.bind(this);
    this.postReport = this.postReport.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  nextImage(e){
    if (this.props.displayedImages[this.props.displayedImages.indexOf(this.state.currentPhoto) + 1]) {
      this.setState({
        currentPhoto: this.props.displayedImages[this.props.displayedImages.indexOf(this.state.currentPhoto) + 1]
      })
    } 
    e.preventDefault()
  }

  previousImage(e){
    if (this.props.displayedImages[this.props.displayedImages.indexOf(this.state.currentPhoto) - 1]) {
      this.setState({
        currentPhoto: this.props.displayedImages[this.props.displayedImages.indexOf(this.state.currentPhoto) - 1]
      })
    }
    e.preventDefault()
  }

  report(){
    this.setState({ report: !this.state.report });
  }

  postReport(e) {
    const { target } = e;
    const { currentPhoto } = this.state;
    const reason = target.textContent;
    this.report()
    this.props.postFlag(reason, currentPhoto);
  }

  formatDate(date) {
    var monthObj = {
      '01': 'Jan', 
      '02': 'Feb', 
      '03': 'Mar',
      '04': 'Apr', 
      '05': 'May', 
      '06': 'Jun', 
      '07': 'Jul',
      '08': 'Aug', 
      '09': 'Sep', 
      '10': 'Oct',
      '11': 'Nov', 
      '12': 'Dec'
    };
    var year = date.slice(0, 4)
    var month = date.slice(5, 7).toString();
    var day = date.slice(8, 10);
    return monthObj[month] + ' ' + day + ', ' + year;
  }

  render(){
    if (this.state.report === false) {
      return (
        <ModalDiv id='simpleModal' className='modal'>
          <CloseBtn onClick={(e) => this.props.closeModal(e)} className='closeBtn'>&times;</CloseBtn>
          <OuterDiv className='outerDiv'>            
            <LeftArrow className='leftArrow' onClick={(e) => this.previousImage(e)}>&lt;</LeftArrow>            
              <ModalContentHolder className='modal-content-holder'>
                <ModalContent className='modal-content' src={this.state.currentPhoto.url} />
                <ModalFooter className='modal-footer'>
                  <CircleHolder className='circle-holder'>
                    <Circle className='circle'>OT</Circle>
                  </CircleHolder>
                  <TextHolder className='text-holder'>
                    <Text className='text'>{this.state.currentPhoto.username}</Text>
                    <DinedOn className='dinedOn'>{this.formatDate(this.state.currentPhoto.date.slice(0,10))}</DinedOn>
                  </TextHolder>
                  <FlagIcon onClick={(e) => this.report(e)} className='flag-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path id='_24._Tiny_Flag_Icon' fill='#fff' data-name='24. Tiny Flag Icon' d='M485,475H469v12h-2V463h18l-3,6Zm-16-10v8h13l-2-4,2-4H469Z' transform='translate(-464 -463)'/>
                  </FlagIcon>
                </ModalFooter>
              </ModalContentHolder>           
            <RightArrowDiv className='rightArrowDiv'>
              <RightArrow className='rightArrow' onClick={(e) => this.nextImage(e)}>&gt;</RightArrow>
            </RightArrowDiv>          
          </OuterDiv>
        </ModalDiv>
      )
    } else {
      return (
        <div>
          <Flag postReport={this.postReport} report={this.report}/>
          <ModalDiv id='simpleModal' className='modal'>
            <CloseBtn onClick={(e) => this.props.closeModal(e)} className='closeBtn'>&times;</CloseBtn>
            <OuterDiv className='outerDiv'>
              <LeftArrow className='leftArrow' onClick={(e) => this.previousImage(e)}>&lt;</LeftArrow>
                <ModalContentHolder className='modal-content-holder'>
                  <ModalContent className='modal-content' src={this.state.currentPhoto.url} />
                  <ModalFooter className='modal-footer'>
                    <CircleHolder className='circle-holder'>
                      <Circle className='circle'>OT</Circle>
                    </CircleHolder>
                    <TextHolder className='text-holder'>
                      <Text className='text'>{this.state.currentPhoto.username}</Text>
                      <DinedOn className='dinedOn'>{this.formatDate(this.state.currentPhoto.date.slice(0,10))}</DinedOn>
                    </TextHolder>
                    <FlagIcon onClick={this.report} className='flag-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path id='_24._Tiny_Flag_Icon' fill='#fff' data-name='24. Tiny Flag Icon' d='M485,475H469v12h-2V463h18l-3,6Zm-16-10v8h13l-2-4,2-4H469Z' transform='translate(-464 -463)'/>
                    </FlagIcon>
                  </ModalFooter>
                </ModalContentHolder>
               <RightArrowDiv className='rightArrowDiv'>
                <RightArrow className='rightArrow' onClick={(e) => this.nextImage(e)}>&gt;</RightArrow>
              </RightArrowDiv>
            </OuterDiv>
          </ModalDiv>
        </div>
      )
    }
  }
}

export default Modal;