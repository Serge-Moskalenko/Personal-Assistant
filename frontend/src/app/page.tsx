"use client";
import { Box } from "@mui/material";
import { useAuthGuard } from "./auth/hooks/useAuthGuard";
import { NewsPage } from "./news/page";

export default function HomePage() {
  useAuthGuard();
  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Box textAlign="center"></Box>
        <NewsPage />
      </Box>
    </div>
  );
}

//  {isFetching && (
//         <Box sx={{ textAlign: "center", mb: 2 }}>
//           <CircularProgress size={24} />
//         </Box>
//       )}

//       <Box sx={{ display: "flex" }}>

//         <Box sx={{ flexGrow: 1 }} />

//         <Box sx={{ width: { xs: "100%", md: 400 }, mr: 2 }}>
//           <List disablePadding>
//             <Typography variant="h5" gutterBottom mx={"33%"}>
//               BBC News
//             </Typography>

//             {data!.results.map((item: NewsItem, idx: number) => (
//               <Box key={item.guid}>
//                 <ListItem alignItems="flex-start" sx={{ py: 1 }}>
//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle1">{item.title}</Typography>
//                     }
//                     secondary={
//                       <>
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           paragraph
//                         >
//                           {item.description}
//                         </Typography>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Button
//                             size="small"
//                             component="a"
//                             href={item.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             GO TO
//                           </Button>
//                           <Typography variant="caption" color="text.secondary">
//                             {new Date(item.pub_date).toLocaleString("uk-UA")}
//                           </Typography>
//                         </Box>
//                       </>
//                     }
//                   />
//                 </ListItem>

//                 {idx < data!.results.length - 1 && <Divider component="li" />}
//               </Box>
//             ))}
//           </List>

//           {totalPages > 1 && (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(_, value) => setPage(value)}
//                 color="primary"
//                 showFirstButton
//                 showLastButton
//               />
//             </Box>
//           )}
//         </Box>
//       </Box>
