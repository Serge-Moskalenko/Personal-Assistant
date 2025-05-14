"use client";

import { NewsItem } from "@/types/News/NewsItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

interface NewsItemCardProps {
  item: NewsItem;
  isLast: boolean;
}

export default function NewsItemCard({ item, isLast }: NewsItemCardProps) {
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ py: 1, px: 2 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography component="div" variant="subtitle1">
              {item.title}
            </Typography>
          }
          secondary={
            <Box>
              <Typography
                component="div"
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {item.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  component="a"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GO TO
                </Button>
                <Typography
                  component="div"
                  variant="caption"
                  color="text.secondary"
                >
                  {new Date(item.pub_date).toLocaleString("uk-UA")}
                </Typography>
              </Box>
            </Box>
          }
        />
      </ListItem>
      {!isLast && <Divider component="li" />}
    </>
  );
}
