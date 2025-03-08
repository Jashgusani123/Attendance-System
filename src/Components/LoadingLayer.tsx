import { Box, Skeleton } from '@mui/material'

const LoadingLayer = () => {
  return (
    <Box sx={{ width: "100%" , height:"100%"}}>
            <Skeleton height={"20%"} width={"90%"}/>
            <Skeleton animation="wave" height={"70%"} />
            <Skeleton height={"30%"}/>
        </Box>
  )
}

export default LoadingLayer