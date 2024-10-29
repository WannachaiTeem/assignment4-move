import { Button, TextField } from "@mui/material";
import axios from "axios";
import { MovieIMDBGetRequest } from "../model/MovieIMDBGetRequest";
import { useEffect, useRef, useState } from "react";

function CallApiPage() {
  const [data, setData] = useState<MovieIMDBGetRequest>();
  const input = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();

  useEffect(() => {
    const callapi = async () => {
      const url = "http://www.omdbapi.com/?i=tt3896198&apikey=4602df77";
      const response = await axios.get(url);
      const movie: MovieIMDBGetRequest = response.data;
      console.log(movie);
      setData(movie);
    };
    callapi();
  }, []);
  return (
    <>
      <TextField inputRef={input} size="small"></TextField>
      <Button
        variant="contained"
        onClick={async () => {
          if (input.current) {
            findOne(input.current.value);
          }
        }}
      >
        Find One
      </Button>
      <Button variant="contained" onClick={callApi}>
        Call Api
      </Button>
      <h2>{data?.Title}</h2>
      <TextField inputRef={inputName} size="small"></TextField>
      <Button
        variant="contained"
        onClick={async () => {
          if (inputName.current) {
            findName(inputName.current.value);
          }
        }}
      >
        Find Name
      </Button>
    </>
  );
  //แบบฟิกหนังไว้
  async function callApi() {
    // const url = "http://202.28.34.197/tripbooking/trip";
    const url = "http://www.omdbapi.com/?i=tt3896198&apikey=4602df77";
    const response = await axios.get(url);
    const movie: MovieIMDBGetRequest = response.data;
    console.log(movie);
    return movie;
  }

  //แบบค้นหาจากไอดี
  async function findOne(id: string) {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=4602df77`;
    // const url = `http://localhost/tripbooking/trip/${id}`;
    const response = await axios.get(url);
    const movie: MovieIMDBGetRequest = response.data;
    setData(movie);
    console.log(movie);
    return movie;
  }

  //แบบค้นหาจากชื่ิอย่อ หรือ ชื่อเต็ม
  async function findName(inputname: string) {
    const url = "http://www.omdbapi.com/?apikey=4602df77";
    const response = await axios.get(url, {
      params: {
        s : inputname,
      },
    });
    const movie: MovieIMDBGetRequest = response.data;
    setData(movie);
    console.log(movie);
    return movie;
  }
}

export default CallApiPage;
