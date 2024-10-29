import axios from "axios";
import { MovieIMDBGetRequest } from "../model/MovieIMDBGetRequest";


export default class MovieService {

  async getMovieByFullName(inputname: string) {
    // const url = `http://www.omdbapi.com/?=${inputname}&apikey=4602df77`;
    // // const url = "http://www.omdbapi.com/?apikey=c055706d";
    //   const response = await axios.get(url, {
    //     params: {
    //       t: inputname
    //     },
    //   });
    //   const movie: MovieIMDBGetRequest = response.data.Search;
    //   console.log(movie);
    
    //   console.log(response.data.totalResults)
    //   // คืนค่าจำนวนรายการหนังทั้งหมดที่พบ
    //   return movie;
    const url = `http://www.omdbapi.com/?t=${inputname}&apikey=4602df77`;
        const response = await axios.get(url);
        const movie: MovieIMDBGetRequest = response.data;
        console.log(movie);
        return movie;
    }

    async getMovieByName(inputname: string, page: number) {
      const url = "http://www.omdbapi.com/?apikey=c055706d";
        const response = await axios.get(url, {
          params: {
            s: inputname,
            page: page,
          },
        });
        const movie: MovieIMDBGetRequest[] = response.data.Search;
        console.log(movie);
      
        console.log(response.data.totalResults)
        // คืนค่าจำนวนรายการหนังทั้งหมดที่พบ
        return movie;
      }
   
    async getMovieById(id: string) {
        const url = `http://www.omdbapi.com/?i=${id}&apikey=4602df77`;
        const response = await axios.get(url);
        const movie: MovieIMDBGetRequest = response.data;
        console.log(movie);
        return movie;
    }
  }