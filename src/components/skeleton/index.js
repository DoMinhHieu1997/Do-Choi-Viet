import { Grid} from "@mui/material";
import { Skeleton } from "@mui/material";

export const ProductItemSkeleton = () => {
    return <Grid item xs={6} md={3}>
        <div className="p-2">
            <Skeleton className="rounded mb-2" variant="rectangular" height={250} />
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>
    </Grid>
}