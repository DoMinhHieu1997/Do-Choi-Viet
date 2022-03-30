import TopSell from "./TopSell";
import { Container } from "@mui/material";
import Classification from "./Classification";

const HomePage = () => {
  return <Container sx={{mt:15, mb:10}}>
    <div className="ratio ratio-21x9 border mb-5 bg-light"></div>
    <Classification/>
    <TopSell/>
  </Container>
}

export default HomePage;