import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  TextField,
} from "@mui/material";
import { MovieIMDBGetRequest } from "../model/MovieIMDBGetRequest";
import { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import MovieService from "../service/Movieapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function MoviePage() {
  const navMovie = useNavigate();
  const [data, setData] = useState<MovieIMDBGetRequest[]>([]);
  const input = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputFullName = useRef<HTMLInputElement>();
  const [page, setPage] = useState(1);
  const movieservice = new MovieService();
  // const [searchType, setSearchType] = useState("id"); // เพิ่ม state สำหรับเก็บค่าประเภทการค้นหา
  const [searchParams] = useSearchParams(); // เปลี่ยนชื่อตัวแปร search เป็น searchParams
  const movename2 = searchParams.get("inputname"); // ใช้ searchParams แทน search
  const movepage = searchParams.get("page");
  console.log("Movie Name = ", movename2);

  function navigatorMovie(id: unknown) {
    console.log(inputName.current?.value);
    navMovie(
      "/showmovie/?index=" +
        id +
        "&inputname=" +
        inputName.current?.value.trim() +
        "&page=" +
        page
    );
  }

  // ฟังก์ชันเรียก API หรือโค้ดที่ใช้ในการดึงข้อมูลหนัง
  // เรียกใช้ฟังก์ชันเมื่อต้องการเปลี่ยนหน้า
  const handleNextPage = () => {
    setPage(page + 1);
    if (inputName.current) {
      getMovieByName(inputName.current.value.trim(), page + 1); // เรียกใช้ findName และส่งหน้าใหม่ไปด้วย
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (inputName.current) {
        getMovieByName(inputName.current.value.trim(), page - 1); // เรียกใช้ findName และส่งหน้าก่อนหน้าไปด้วย
      }
    }
  };

  const [search] = useSearchParams();
  const movename = search.get("inputname");
  useEffect(() => {
    if (movename) {
      const callapi = async () => {
        getMovieByName(movename, Number(movepage));
        // getMovieByFullName(movename);
        //setData(movieData); // เซ็ตค่า movie ด้วย setMovie
      };
      callapi();
      setPage(Number(movepage));
    }
  }, [movename, movepage]); // เรียกใช้ useEffect เมื่อค่า movename เปลี่ยนแปลงพื่อให้ useEffect ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount เท่านั้น

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <TextField
          inputRef={input}
          size="small"
          sx={{ width: "120px", minHeight: "0px", marginRight: "10px" }}
        ></TextField>
        <Button
          sx={{ marginRight: "10px" }}
          variant="contained"
          onClick={async () => {
            if (input.current) {
              // movieservice.getMovieById(input.current.value);
              getMovieById(input.current.value);
            }
          }}
        >
          Search By ID
        </Button>
        <TextField
          defaultValue={movename2}
          inputRef={inputName}
          size="small"
          sx={{ marginRight: "10px" }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={async () => {
            // console.log(inputName.current.value)

            if (
              inputName.current?.value.trim() !== null &&
              inputName.current?.value.trim() !== ""
            ) {
              // movieservice.getMovieByName(inputName.current.value, page); // เรียกใช้ findName และส่งหน้าปัจจุบันไปด้วย
              console.log(inputName.current?.value.trim());
              getMovieByName("" + inputName.current?.value.trim(), page);
            } else {
              setData([]);
              navMovie("/");
            }
          }}
        >
          Search By Name
        </Button>
        <TextField
          defaultValue={movename2}
          inputRef={inputFullName}
          size="small"
          sx={{ marginRight: "10px" }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={async () => {
            // console.log(inputName.current.value)

            if (
              inputFullName.current?.value.trim() !== null &&
              inputFullName.current?.value.trim() !== "" &&
              inputFullName.current?.value.trim() !== " & "
            ) {
              // movieservice.getMovieByName(inputName.current.value, page); // เรียกใช้ findName และส่งหน้าปัจจุบันไปด้วย
              console.log(inputFullName.current?.value.trim());
              getMovieByFullName("" + inputFullName.current?.value.trim());
            } else {
              // setDatafull();
              navMovie("/");
            }
          }}
        >
          Search By FullName
        </Button>
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* ปุ่มย้อนกลับ */}
        {page > 1 && (
          <div style={{ marginRight: "10px" }}>
            <Button
              onClick={handlePrevPage}
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
              style={{ borderRadius: "20px" }}
            >
              <ArrowBackIcon /> PrevPage
            </Button>
          </div>
        )}
        {/* แสดงหมายเลขหน้า */}
        {data.length > 0 && (
          <div style={{ marginRight: "10px" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              Page : {page}
            </p>
          </div>
        )}
        {/* ปุ่มไปหน้าถัดไป */}
        {data.length > 2 && (
          <div style={{ marginLeft: "10px" }}>
            <Button
              onClick={handleNextPage}
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
              style={{ borderRadius: "20px" }}
            >
              NextPage <ArrowForwardIcon />
            </Button>
          </div>
        )}
      </div>

      {/* ส่วนแสดงรายการหนัง */}
      <Container
        sx={{
          // display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          sx={{ gap: 2 }}
          justifyContent="center"
        >
          {/* {datafullname?.Title} */}
          {data.map((item) => (
            <div
              key={item?.imdbID}
              style={{
                display: "flex",
                position: "relative",
                width: "20%",
                flexWrap: "wrap",
                justifyContent: "center",
              }} // เพิ่มคุณสมบัตินี้เพื่อจัดให้อยู่ตรงกลางในแนวนอน
            >
              <Card sx={{ width: 200, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={item?.Poster}
                  alt="Movie Poster"
                  onClick={() => navigatorMovie(item?.imdbID)}
                />
                <div
                  style={{
                    textAlign: "start",
                    padding: "10px",
                    fontSize: "100%",
                    height: "30px",
                    whiteSpace: "nowrap" /* ให้ข้อความไม่ขึ้นบรรทัดใหม่ */,
                    overflow:
                      "hidden" /* ป้องกันข้อความที่เกินขอบเขตจากการแสดงผล */,
                    textOverflow:
                      "ellipsis" /* แสดง ... ในกรณีที่ข้อความยาวเกินกว่าที่กำหนด */,
                  }}
                >
                  {item?.Title}
                </div>

                <div style={{ position: "absolute", top: 0, left: 10 }}>
                  <BookmarkIcon
                    sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 40 }}
                  />
                  <AddIcon
                    sx={{
                      color: "black",
                      fontSize: 25,
                      position: "absolute",
                      top: 4,
                      left: 8,
                    }}
                  />
                </div>
                <CardContent style={{ height: "45px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StarIcon
                      sx={{ color: "#E3AF00", width: "20px" }}
                    ></StarIcon>
                    <StarBorderIcon
                      sx={{
                        color: "#007CD7",
                        width: "20px",
                        marginLeft: "20px",
                      }}
                    ></StarBorderIcon>
                  </div>
                  <div>
                    <Link style={{ color: "black", fontSize: "14px" }}>
                      Type Movie : {item?.Type}
                    </Link>
                  </div>
                </CardContent>
                <center style={{ marginTop: "10px", padding: "10px" }}>
                  <Button
                    sx={{ width: "100%", fontSize: "12px" }}
                    variant="outlined"
                  >
                    <AddIcon></AddIcon>
                    Watchlist
                  </Button>
                </center>
                <Button
                  sx={{
                    width: "60%",
                    fontSize: "12px",
                    marginLeft: "30px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PlayArrowIcon></PlayArrowIcon>
                  </div>
                  Trailer
                </Button>
              </Card>
            </div>
          ))}
        </Box>
      </Container>
    </>
  );

  //แบบค้นหาจากไอดี
  async function getMovieById(id: string) {
    const result: MovieIMDBGetRequest = await movieservice.getMovieById(id);
    setData([result]);
  }

  //แบบค้นหาจากชื่ิอย่อ หรือ ชื่อเต็ม
  async function getMovieByName(inputname: string, page: number) {
    try {
      const result: MovieIMDBGetRequest[] = await movieservice.getMovieByName(
        inputname,
        page
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching movies by name:", error);
    }
  }

  //แบบค้นหาจากชื่อเต็มของหนัง
  async function getMovieByFullName(inputfullname: string) {
    try {
      const result: MovieIMDBGetRequest = await movieservice.getMovieByFullName(
        inputfullname
      );
      setData([result]);
      console.log("Result",result);
      console.log("Data",data);
    } catch (error) {
      console.error("Error fetching movies by name:", error);
    }
  }
}

export default MoviePage;
