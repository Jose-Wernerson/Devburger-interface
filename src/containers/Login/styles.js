import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundLogin from '../../assets/Background-login.svg';
import Background from '../../assets/Background.svg';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  background: url('${BackgroundLogin}');
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 65%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const RighContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  max-width: 50%;

  background: url('${Background}');
  background-color: #1e1e1e;

  p {
    color: #fff;
    font-size: 18px;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-family: "Road Rage", serif;
  font-size: 40px;
  color: #ffff;

  span {
    color: #9758a6;
    font-family: "Road Rage", serif;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ImputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  input {
    width: 100%;
    border: none;
    height: 52px;
    border-radius: 5px;
    padding: 0 16px;
  }

  label {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  p {
    font-size: 14px;
    color: #cf3057;
    line-height: 80%;
    font-weight: 400;
    height: 10px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    input {
      height: 40px;
    }
    label {
      font-size: 16px;
    }
  }
`;

export const Link = styled(ReactLink)`
  text-decoration: underline;
  color: #fff;

`;
