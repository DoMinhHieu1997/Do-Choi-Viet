import TopSell from "./TopSell";
import { Container } from "@mui/material";
import Classification from "./Classification";
import { getToken } from "../../common";
import { useEffect } from "react";
import Banner from '../../images/Banner.png';

const HomePage = ({setToken}) => {
  useEffect(() => {
    setToken(getToken());
  }, []);

  return <Container sx={{mt:15, mb:10}}>
    <div className="ratio ratio-21x9 border mb-5 bg-light classify-icon" style={{backgroundImage:`url(${Banner})`}}></div>
    <Classification/>
    <TopSell/>
  </Container>
}

export default HomePage;