import express, { Router } from "express"
import { getTopProductsByRevenue, getTotalSalesPerCust , getReportOfPastSales, getTotalExceedAvgQunetity } from "../controllers/sales.js";

const router = express.Router()

router.get("/totalsalesperCustomer", getTotalSalesPerCust)
router.get("/top3productsByRevenue", getTopProductsByRevenue)
router.get("/reportofsales", getReportOfPastSales)
router.get("/totalexceedavgquant", getTotalExceedAvgQunetity)

export default router;