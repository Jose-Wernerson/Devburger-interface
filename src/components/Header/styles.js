import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    background-color: #1f1f1f;
    width: 100%;
    height: 72px;
    padding: 0 56px;
    box-sizing: border-box;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    margin-left: 80px;
    box-sizing: border-box;

    div {
        display: flex;
        align-items: center;
        gap: 40px;

        hr {
            height: 24px;
            border: 1px solid #625e5e;
        }
    }
`;

export const HeaderLink = styled(Link)`
    color: ${(props) => (props.$isActive ? "#9758a6" : "#fff")};
    border-bottom: ${(props) => (props.$isActive ? "#9758a6 1px solid" : "none")};
    padding-bottom: 5px;
    text-decoration: none;
    font-size: 20px;
    transition: color 200ms, border 200ms, font-size 200ms;

    &:hover {
        color: #9758a6;
         border: 1px solid #9758a6;
        background-color: transparent; 
         font-size: 22px;
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    P {
        color: #fff;
        line-height: 90%;
        font-weight: 300;
    }
    span {
        font-weight: 700;
        color: #9758a6;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 50px;
`;

export const Logout = styled.button`
    color: rgb(182, 34, 1);
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
    background-color: transparent;
    border: 1px solid transparent;
    box-sizing: border-box;
    transition: border 200ms, font-size 200ms;

    &:hover {
        border: 1px solid mintcream;
        background-color: transparent;
        font-size: 15px;
    }
`;
