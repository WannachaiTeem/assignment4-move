import { Button, Card, Divider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link, useSearchParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useEffect, useState } from "react";
import { MovieIMDBGetRequest } from "../model/MovieIMDBGetRequest";
import axios from "axios";

function ShowMoviePage() {
  const [movie, setMovie] = useState<MovieIMDBGetRequest>(); // ประกาศตัวแปร movie ด้วย

  const [search] = useSearchParams();
  const id = search.get("index");
  const movename = search.get("inputname");
  const movepage = search.get("page");

  useEffect(() => {
    const callapi = async () => {
      const url = `http://www.omdbapi.com/?i=${id}&apikey=4602df77`;
      const response = await axios.get(url);
      const movieData: MovieIMDBGetRequest = response.data;
      console.log(movieData);
      setMovie(movieData); // เซ็ตค่า movie ด้วย setMovie
    };
    callapi();
  }, [id]); // ใส่ id เป็น dependency ของ useEffect

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          // background: "#E0E0E0",
          height: "1000px",
        }}
      >
        <div>
          <Link to={"/?inputname=" + movename + "&page=" + movepage}>
            <h3>
              {"< "}
              Back
            </h3>
          </Link>

          <Card style={{background: "#E0E0E0"}}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <div style={{ marginLeft: "40px" }}>
                {/* {id} */}
                <h3>{movie?.Title}</h3>
              </div>
              <Box
                sx={{ fontSize: "12px", marginRight: "30px", marginTop: "5px" }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ textAlign: "center", marginRight: "20px" }}>
                    IMDB RATING
                  </div>
                  <div style={{ textAlign: "center", marginRight: "20px" }}>
                    YOUR RATING
                  </div>
                  <div style={{ textAlign: "center" }}>POPULARITY</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "30px",
                    }}
                  >
                    <StarIcon
                      sx={{ color: "#E3AF00", width: "35px" }}
                    ></StarIcon>
                    {movie?.imdbRating}/10
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "25px",
                    }}
                  >
                    <StarBorderIcon
                      sx={{
                        color: "#007CD7",
                        width: "20px",
                        marginLeft: "10px",
                      }}
                    ></StarBorderIcon>
                    Rate
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowCircleRightIcon
                      sx={{
                        color: "black",
                        width: "20px",
                        marginLeft: "10px",
                      }}
                    ></ArrowCircleRightIcon>
                    {movie?.imdbVotes}
                  </div>
                </div>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              sx={{ mx: 3, marginTop: "10px" }}
            >
              <img
                style={{ width: 250, height: 350 }}
                src={movie?.Poster}
                alt=""
              />
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{ gap: 2, mx: 3 }}
              >
                <h4>{movie?.Plot}</h4>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Card
                  style={{ width: "150px", height: "160px", background: "" }}
                >
                  <VideoLibraryIcon
                    sx={{
                      color: "#007CD7",
                      width: "30px",
                      height: "30px",
                      marginLeft: "60px",
                      marginTop: "50px",
                    }}
                  ></VideoLibraryIcon>
                  <br />
                  <p style={{ textAlign: "center", fontSize: "12px" }}>
                    30 VIDEOS
                  </p>
                </Card>
                <br />
                <Card
                  style={{ width: "150px", height: "160px", background: "" }}
                >
                  <CollectionsIcon
                    sx={{
                      color: "#007CD7",
                      width: "30px",
                      height: "30px",
                      marginLeft: "60px",
                      marginTop: "50px",
                    }}
                  ></CollectionsIcon>
                  <br />
                  <p style={{ textAlign: "center", fontSize: "12px" }}>
                    99+ PHOTOS
                  </p>
                </Card>
              </Box>
            </Box>
            <br />
            <Box display={"flex"} flexDirection={"row"} sx={{ gap: 4, mx: 3 }}>
              <div>
                {movie?.Genre.split(",").map((genre, index) => (
                  <Button
                    key={index}
                    style={{
                      borderRadius: "20px",
                      background: "black",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ color: "white" }}>
                      {genre.trim()}{" "}
                      {/* ใช้ trim() เพื่อลบช่องว่างด้านหน้าและด้านหลังของข้อความ */}
                    </div>
                  </Button>
                ))}
              </div>
            </Box>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                  marginLeft: "30px",
                }}
              >
                <Divider sx={{ width: "95%", bgcolor: "gray", my: 2 }} />
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  marginLeft={"20px"}
                >
                   <div style={{ marginRight: "10px" }}>
                   Director
                  </div>
                  {movie?.Director.split(",").map((director,index) => (
                    <h4 key={index} style={{ color: "blue" }}>{director.trim()}</h4>
                  ))}
                </Box>
                <Divider sx={{ width: "95%", bgcolor: "gray", my: 2 }} />
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  marginLeft={"20px"}
                >
                  <div style={{ marginRight: "10px" }}>
                    Writer 
                  </div>
                  {movie?.Writer.split(",").map((writer, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <h4 style={{ color: "blue", marginRight: "10px" }}>
                        {writer.trim()}
                      </h4>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ width: "95%", bgcolor: "gray", my: 2 }} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "20%",
                  marginLeft: "20px",
                  marginTop: "85px",
                }}
              >
                <button
                  style={{
                    background: "#007CD7",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon style={{ marginRight: "2px" }} />
                  Add to Watchlist
                </button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default ShowMoviePage;
