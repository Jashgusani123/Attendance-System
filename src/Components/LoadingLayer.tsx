import { Box, Skeleton } from "@mui/material";

const LoadingLayer = ({ type }: { type: String }) => {
  return (
    <Box sx={{ width: "100%", height: "100%", p: "20px" }}>
      {/* Header Skeleton */}
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#ffc800",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          mb: "10px"
        }}
      >
        <Skeleton
          variant="rectangular"
          width={250}
          height={64}
          sx={{ bgcolor: "#1c398e", p: 1, width: "fit-content", mr: 2, borderRadius: "10px" }}
          animation="wave"
        />
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "3px" }}>
          <Skeleton width={50} height={50} animation="wave" variant="circular" sx={{ mt: 1 }} />
          <Skeleton width={50} height={50} animation="wave" variant="circular" sx={{ mt: 1 }} />
          <Skeleton width={50} height={50} animation="wave" variant="circular" sx={{ mt: 1 }} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: "#ffc800",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Skeleton
          variant="circular"
          width={64}
          height={64}
          sx={{ bgcolor: "#1c398e", p: 1, width: "fit-content", mr: 2 }}
          animation="wave"
        />
        <Box>
          <Skeleton
            width={120}
            height={24}
            animation="wave"
            sx={{ bgcolor: "#1c398e", borderRadius: 2, p: 1, width: "fit-content" }}
          />
          <Skeleton width={180} height={18} animation="wave" sx={{ mt: 1, bgcolor: "#0000001c" }} />
        </Box>
      </Box>

      <Box className="main_Container flex justify-between gap-6 mt-6 flex-wrap">
        {/* Left Section - Student Attendance Overview */}
        <Box className="w-[100%] lg:w-full bg-[#1c398eed] text-white p-6 rounded-2xl shadow-lg">
          <Skeleton
            width={200}
            height={32}
            animation="wave"
            sx={{ bgcolor: "#ffc800", borderRadius: 2, p: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mt: 2, bgcolor: "blue.dark" }}
          />
        </Box>

        {/* Right Section - Live Classes */}
        {type === "Student" && <Box className="w-[100%] lg:w-full bg-[#1c398eed] text-white p-6 rounded-2xl shadow-lg">
          <Box display="flex" alignItems="center" sx={{ bgcolor: "#ffc800", borderRadius: 2, p: 1, width: "fit-content" }}>
            <Skeleton variant="circular" width={24} height={24} animation="wave" sx={{ mr: 1 }} />
            <Skeleton width={120} height={28} animation="wave" />
          </Box>

          <Box className="space-y-3 mt-4">
            {[...Array(3)].map((_, index) => (
              <Box key={index} className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md">
                <Box>
                  <Skeleton width={100} height={20} animation="wave" />
                  <Skeleton width={120} height={16} animation="wave" sx={{ mt: 1 }} />
                </Box>
                <Skeleton width={80} height={20} animation="wave" />
              </Box>
            ))}
          </Box>
        </Box>
        }
      </Box>

      {type === "Teacher" && <>
        <Box className="w-[100%] mt-8 lg:w-full bg-[#1c398eed] text-white p-6 rounded-2xl shadow-lg">
          <Box display="flex" alignItems="center" sx={{ bgcolor: "#ffc800", borderRadius: 2, p: 1, width: "fit-content" }}>
            <Skeleton variant="circular" width={24} height={24} animation="wave" sx={{ mr: 1 }} />
            <Skeleton width={120} height={28} animation="wave" />
          </Box>

          <Box className="space-y-3 mt-4">
            {[...Array(3)].map((_, index) => (
              <Box key={index} className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md">
                <Box>
                  <Skeleton width={100} height={20} animation="wave" />
                  <Skeleton width={120} height={16} animation="wave" sx={{ mt: 1 }} />
                </Box>
                <Skeleton width={80} height={20} animation="wave" />
              </Box>
            ))}
          </Box>
        </Box>
      </>}

      {/* Additional Section */}
      {
        type === "Teacher" && <>
          <Box className="w-[100%] mt-5 lg:w-full bg-[#1c398eed] text-white p-6 rounded-2xl shadow-lg">
            <Box display="flex" alignItems="center" sx={{ bgcolor: "#ffc800", borderRadius: 2, p: 1, width: "fit-content" }}>
              <Skeleton variant="circular" width={24} height={24} animation="wave" sx={{ mr: 1 }} />
              <Skeleton width={120} height={28} animation="wave" />
            </Box>

            <Box className="space-y-3 mt-4">
              {[...Array(3)].map((_, index) => (
                <Box key={index} className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md">
                  <Box>
                    <Skeleton width={100} height={20} animation="wave" />
                    <Skeleton width={120} height={16} animation="wave" sx={{ mt: 1 }} />
                  </Box>
                  <Skeleton width={80} height={20} animation="wave" />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Button Section */}
          <Box display="flex" alignItems="center" sx={{ m: "20px", bgcolor: "#ffc800", borderRadius: 2, p: 1, width: "fit-content" }}>
            <Skeleton variant="rectangular" width={24} height={24} animation="wave" sx={{ mr: 1 }} />
            <Skeleton width={120} height={28} animation="wave" />
          </Box>
        </>
      }
    </Box >
  );
};

export default LoadingLayer;
