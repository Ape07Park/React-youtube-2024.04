import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useAuthContext } from "../context/AuthContext";
import LoginModal from "./LoginModal";

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    console.log(text);
    navigate(`/videos/${text}`);
  }
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  const { user, logout } = useAuthContext();

  return (
    <header>
      <Stack direction={'row'} alignItems='center'>
        <Grid container>
          <Grid item xs={3}>
            <Link to='/' style={{textDecoration: 'none'}}>
              <Stack direction={'row'} spacing={1} alignItems='center'>
                <YouTubeIcon color='error' fontSize="large" />
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Youtube</Typography>
              </Stack>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Paper
              component="form" onSubmit={handleSubmit}
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색..."
                value={text} 
                onChange={e => setText(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Stack direction='row' spacing={2} justifyContent='right' alignItems='center'>
              {user && user.isAdmin && 
                <Link to='/videos/admin'><Typography variant="h6">관리자 메뉴</Typography></Link>}
              {user && 
                <Link to='/videos/record'><Typography variant="h6">시청기록</Typography></Link>}
              {user && user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} height='32' style={{borderRadius:100}} />
              )}
              {user && <Typography variant="h6">{user.displayName}</Typography>}
              {user && (
                <Button variant="outlined" onClick={logout}>
                  로그아웃
                </Button>
              )}
              {!user && <LoginModal />}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Divider sx={{my: 1}} />
    </header>
  )
}