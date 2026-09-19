import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderNumber,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      deliveryArea,
      shippingSpeed,
      subtotal,
      deliveryCharge,
      discountAmount,
      appliedCoupon,
      giftWrap,
      totalAmount,
      paymentMethod,
      notes,
      items,
    } = body;

    const newOrder = {
      id: orderNumber || `KC-2026-${Date.now().toString().slice(-5)}`,
      customerName: customerName || "Guest Patron",
      customerPhone: customerPhone || "",
      customerEmail: customerEmail || "",
      customerAddress: customerAddress || "",
      deliveryArea: deliveryArea || "inside",
      shippingSpeed: shippingSpeed || "Standard",
      subtotal: Number(subtotal) || 0,
      deliveryCharge: Number(deliveryCharge) || 0,
      discountAmount: Number(discountAmount) || 0,
      appliedCoupon: appliedCoupon || null,
      giftWrap: giftWrap || null,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "Cash on Delivery",
      status: "Pending",
      courierName: "Steadfast Courier",
      trackingCode: "",
      notes: notes || "",
      items: items || [],
      createdAt: new Date().toISOString(),
    };

    // Attempt to persist to admin-web/data/orders.json for store admin sync
    try {
      const adminOrdersPath = path.resolve(
        process.cwd(),
        "../admin-web/data/orders.json"
      );
      if (fs.existsSync(adminOrdersPath)) {
        const fileData = fs.readFileSync(adminOrdersPath, "utf8");
        const orders = JSON.parse(fileData || "[]");
        orders.unshift(newOrder);
        fs.writeFileSync(adminOrdersPath, JSON.stringify(orders, null, 2), "utf8");
      }
    } catch (e) {
      console.warn("Could not sync order to admin-web database:", e);
    }

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
