import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  }
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}}>
      <Link to='/' style={{textDecoration:"none"}}>
        <Stack direction={'row'} spacing={1}>
          <YouTubeIcon color='error' fontSize="large" />
          <Typography variant="h5" color='error' sx={{fontWeight: 'bold'}}>YouTube</Typography>
        </Stack>
      </Link>
      <Paper
        component="form" onClick={handleSubmit}
        sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:400, marginLeft:15 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Stack>
  )
}