import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import promodeicon from "../../../../assets/img/pdflogo.png";
import whatsappIcon from "../../../../assets/img/whatsapp (1).png";
import internetIcon from "../../../../assets/img/globe.png";
import gmailIcon from "../../../../assets/img/gmail.png";
import { Button, useMediaQuery, CircularProgress, Typography, Box, Divider } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const Invoice = ({ orderData, flag }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleInvoice = () => {
    setShowInvoice((prev) => !prev);
  };

  const downloadPDF = () => {
    setIsLoading(true);
    const doc = new jsPDF("p", "mm", "a4");

    const addWatermark = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      doc.setFontSize(36);
      doc.setTextColor(0, 95, 65);
      doc.setFont("helvetica", "bold");
      doc.text("PROMODE AGRO FARMS", pageWidth / 2, pageHeight / 2, {
        align: "center",
      });
      doc.restoreGraphicsState();
    };

    const addHeader = () => {
      doc.addImage(promodeicon, "PNG", 57, 5, 10, 10);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("PROMODE AGRO FARMS", 105, 10, { align: "center" });
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Deliver Season's Best", 105, 15, { align: "center" });
      doc.text("+918897399587", 107, 21, { align: "center" });
      doc.addImage(whatsappIcon, "PNG", 86, 17, 5, 5,{align:'center'});
      
      // Draw dashed horizontal line
      doc.setLineWidth(0.1);
      doc.setDrawColor(100, 100, 100); // Darker gray color
      const dashLength = 2;
      const gapLength = 2;
      let x = 0;
      while (x < 210) {
        doc.line(x, 25, x + dashLength, 25);
        x += dashLength + gapLength;
      }
    };

    const addFooter = () => {
      const pageHeight = doc.internal.pageSize.height;
      const width = doc.internal.pageSize.width;

   

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("<------------------------------------------------------------ ", width / 2 - 15, pageHeight - 12, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.text("Thank You", width / 2, pageHeight - 12, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.text(" ----------------------------------------------------------->", width / 2 + 15, pageHeight - 12, { align: "left" });

      // Add GSTIN and FSSAI numbers
      // doc.setFontSize(10);
      // doc.text("GSTIN NO: 36ABCFP1254A1ZS", width - 10, pageHeight - 20, { align: "right" });
      // doc.text("FSSAI NO: 13624010000109", width - 10, pageHeight - 25, { align: "right" });

      doc.addImage(internetIcon, "PNG", 6, pageHeight -8.3 , 5, 5);
      doc.text("www.promodeagro.com", 12, pageHeight - 5);

      doc.addImage(gmailIcon, "PNG", 147, pageHeight - 8.5, 5, 5);
      doc.text("support@promodeagro.com", 205, pageHeight - 5, { align: "right" });
    };

    const addBody = () => {
      let y = 32;

      doc.setDrawColor(200, 200, 200); // Light gray color
      doc.line(105, 30, 105, 85); 

      doc.setFontSize(14);
      doc.text("Invoice", 5, y+3);

      doc.setFontSize(11);
      y += 12;

      const textPair = (label, value) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 5, y);
        if(label==="Order ID"){
          doc.setFont("helvetica", "bold");
          doc.text(value || "N/A", 40, y);
          y += 6;
        }
        else{
          doc.setFont("helvetica", "normal");
          doc.text(value || "N/A", 40, y);
          y += 6;

        }
     
      };

      textPair("Order ID", orderData?.id);
      textPair("Customer", orderData?.customerName);
      textPair("Phone", orderData?.customerNumber);

      const address = `${orderData?.address?.house_number || ""}, ${orderData?.address?.address || ""}, ${orderData?.address?.landmark_area || ""}, ${orderData?.address?.zipCode || ""}`;
      const addressLines = doc.splitTextToSize(address, 60);
      doc.setFont("helvetica", "bold");
      doc.text("Address:", 5, y);
      doc.setFont("helvetica", "normal");
      doc.text(addressLines, 40, y);
      y += addressLines.length * 6;

      const dateTime = orderData?.createdAt
        ? new Date(orderData.createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "N/A";
      textPair("Date & Time", dateTime);

      // Store the final y position for table start
      const tableStartY = y + 7;

      // Right section with payment method in a box
      doc.setFontSize(14);
      // Draw payment method box
      const paymentMethod = orderData?.paymentDetails?.method || "N/A";
      const paymentBoxWidth = 20;
      const paymentBoxHeight = 8;
      const paymentBoxX = 205 - paymentBoxWidth;
      const paymentBoxY = 28;
      
      // Draw box
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(249, 249, 249);
      doc.roundedRect(paymentBoxX, paymentBoxY, paymentBoxWidth, paymentBoxHeight, 2, 2, 'FD');
      
      // Add payment method text
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      const xPosition = paymentMethod?.includes("COD")
  ? 200
  : paymentMethod?.includes("Prepaid")
  ? 203
  : 200; // fallback position


      doc.text(paymentMethod, xPosition, paymentBoxY + 5, { align: "right" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Biller Name: ", 108, 42);
      doc.setFont("helvetica", "normal");
      doc.text("Promode Agro Farm", 144, 42);

      doc.setFont("helvetica", "bold");
      doc.text("Billing Address:", 108, 48);
      doc.setFont("helvetica", "normal");
      const address_shop="Dargah khaleej khan, Kismatpur, Hyderabad, Telangana 500028"
      const AddressLines_Shop=doc.splitTextToSize(address_shop,75)
      doc.text(AddressLines_Shop, 144, 48);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Contact No: ", 108, 60);
      doc.setFont("helvetica", "normal");
      doc.text("9701610033", 144, 60);
      doc.text("Items:", 200, tableStartY-3, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.text(`${orderData?.items?.length != null ? orderData.items.length < 10 ? '0' + orderData.items.length : orderData.items.length : 'N/A'}`, 205, tableStartY - 3, { align: "right" });

      return tableStartY;
    };

    const addPaymentDetails = () => {
      // const summaryY = doc.lastAutoTable.finalY + 10;
      const summaryY = doc.internal.pageSize.height-50;

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 5;
      const valueX = pageWidth - margin;
    
      doc.setFontSize(11);
    
      doc.setFont("helvetica", "bold");
      doc.text('Sub Total:', margin, summaryY);
      doc.setFont("helvetica", "normal");
      doc.text(`${orderData?.subTotal || "0.00"}`, valueX, summaryY, { align: 'right' });
    
      doc.setFont("helvetica", "bold");
      doc.text('Shipping Charges:', margin, summaryY + 6);
      doc.setFont("helvetica", "normal");
      doc.text(`${orderData?.deliveryCharges || "0.00"}`, valueX, summaryY + 6, { align: 'right' });
    
      doc.setLineWidth(0.1);
      doc.setDrawColor(100, 100, 100);
      const dashLength = 2;
      const gapLength = 2;
      let x = margin;
      while (x < pageWidth - margin) {
        doc.line(x, summaryY + 10, x + dashLength, summaryY + 10);
        x += dashLength + gapLength;
      }
    
      doc.setFont("helvetica", "bold");
      doc.text('Grand Total:', margin, summaryY + 16);
      doc.text(`${orderData?.finalTotal || "0.00"}`, valueX, summaryY + 16, { align: 'right' });

      x = margin;
      while (x < pageWidth - margin) {
        doc.line(x, summaryY + 20, x + dashLength, summaryY + 20);
        x += dashLength + gapLength;
      }
    
      doc.setFont("helvetica", "bold");
      doc.text('Received:', margin, summaryY + 26);
      doc.setFont("helvetica", "normal");
      doc.text(`${orderData?.paymentDetails?.method === "Prepaid" ? orderData?.finalTotal : "0.00"}`, valueX, summaryY + 26, { align: 'right' });

      doc.setFont("helvetica", "bold");
      doc.text('Balance:', margin, summaryY + 32);
      doc.setFont("helvetica", "normal");
      doc.text(`${orderData?.paymentDetails?.method === "COD" ? orderData?.finalTotal : "0.00"}`, valueX, summaryY + 32, { align: 'right' });
    };

    const tableData = orderData?.items?.map((product, index) => [
      index + 1,
      product.productName || "N/A",
      `${product.quantityUnits || 0}${product.unit || ""}`,
      `${product.quantity || 0}`,
      `${product.price || "0.00"}`,
      `${product.subtotal || "0.00"}`
    ]);
  
    // Custom pagination logic with dynamic item distribution
    const chunks = [];
    if (tableData && tableData.length > 0) {
      const totalItems = tableData.length;
      let currentIndex = 0;

      // First page: 17 items if total items > 20, otherwise 14 items
      const firstPageItems = totalItems > 17 ? 17 : 14;
      chunks.push(tableData.slice(0, firstPageItems));
      currentIndex = firstPageItems;

      // Calculate remaining items
      const remainingItems = tableData.slice(currentIndex);
      
      // For second page
      const secondPageItems = totalItems > 38 ? 21 : 19;
      if (remainingItems.length > 0) {
        chunks.push(remainingItems.slice(0, secondPageItems));
        currentIndex += secondPageItems;
      }

      // For third page and beyond, increase items per page progressively
      let pageNumber = 3;
      let itemsPerPage = secondPageItems + 2; // Start with 2 more items than second page
      
      while (currentIndex < totalItems) {
        const currentChunk = tableData.slice(currentIndex, currentIndex + itemsPerPage);
        if (currentChunk.length > 0) {
          chunks.push(currentChunk);
          currentIndex += itemsPerPage;
          itemsPerPage += 2; // Increase by 2 items for each subsequent page
          pageNumber++;
        } else {
          break;
        }
      }
    }
  
    // Add first page content
    const tableStartY = addBody();
    addWatermark();
    addHeader();
  
    chunks.forEach((chunk, index) => {
      if (index > 0) {
        doc.addPage();
      }
  
      autoTable(doc, {
        head: [["S.No", "Product Name", "Unit", "Quantity", "Rate", "Total Amount"]],
        body: chunk,
        startY: index === 0 ? tableStartY : 30, // Different start position for first page
        margin: { left: 5, right: 5, top: index === 0 ? tableStartY : 30 },
        theme: "striped",
        headStyles: {
          fillColor: [0, 95, 65],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 11,
          cellPadding: 3,
          halign: 'left',
          lineWidth: 0.1,
          lineColor: [0, 95, 65],
          cellWidth: 'auto',
          cellHeight: 8,
        },
        styles: {
          fontSize: 10,
          textColor: [0, 0, 0],
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },
          1: { cellWidth: 88, halign: 'left' },
          2: { cellWidth: 22, halign: 'left' },
          3: { cellWidth: 25, halign: 'center' },
          4: { cellWidth: 15, halign: 'center' },
          5: { cellWidth: 35, halign: 'center' },
        },
        didDrawPage: (data) => {
          addHeader();
          addWatermark();
          addFooter();
          
          // Add "Continue..." text if there are more pages
          if (index < chunks.length - 1) {
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            const tableBottom = data.cursor.y;
            
            // Position the "Continue..." text just below the table
            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(100, 100, 100);
            doc.text("Continue...", pageWidth - 10, tableBottom + 5, { align: "right" });
          }
        },
      });
    });
  
    // Add payment details only once after last table
    addPaymentDetails();
  
    doc.save(`Invoice_${orderData?.orderId || "N/A"}.pdf`);
    setIsLoading(false);
  };

  return (
    <Box>
      {!isMobile && flag ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            variant="text"
            color="success"
            onClick={toggleInvoice}
            sx={{ textTransform: "none" }}
          >
            {showInvoice ? "Hide Invoice" : "See Your Invoice"}
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          color="success"
          onClick={downloadPDF}
          disabled={isLoading}
          sx={{ textTransform: "none", marginTop: "8px" }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="success" />
          ) : (
            <FileDownloadIcon style={{ color: "#1f9151" }} color="#1f9151" />
          )}
          View Invoice
        </Button>
      )}

      {showInvoice && (
        <Box sx={{ 
          mt: 2,
          p: 2,
          bgcolor: '#fff',
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Watermark */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.08,
              fontSize: '56px',
              fontStyle: 'normal',
              fontWeight: 'bold',
              color: 'rgb(0, 95, 65)',
              zIndex: 10,
              pointerEvents: 'none',
              // transform: 'rotate(-5deg)',
              whiteSpace: 'nowrap',
              
            }}
          >
            PROMODE AGRO FARMS
          </Box>

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <Box sx={{ display: 'flex',justifyContent:"center", gap: 2, mb: 2 }}>
              <img src={promodeicon} alt="Logo" style={{ width: 40, height: 40 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', m: 0, fontSize: '16px' }}>
                  PROMODE AGRO FARMS
                </Typography>
                <Typography variant="body2" sx={{ m: 0, fontSize: '12px' }}>
                  Deliver Season's Best
                </Typography>
                <Typography variant="body2" sx={{ m: 0, fontSize: '12px' }}>
                  +918897399587
                </Typography>
              </Box>
            </Box>

            {/* Dashed Line */}
            <Box sx={{ 
              borderBottom: '1.5px dashed black',
              my: 1
            }} />

            {/* Invoice Title and Payment Method */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '14px' }}>Invoice</Typography>
              <Box sx={{ 
                p: '4px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                bgcolor: '#f9f9f9',
                minWidth: 100,
                textAlign: 'center'
              }}>
                <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 500, m: 0 }}>
                  {orderData?.paymentDetails?.method || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Customer and Billing Details */}
            <Box sx={{ display: 'flex', gap: 4, mb: 3, position: 'relative' }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Order ID:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{orderData?.id || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Customer Name:</Typography>
                  <Typography variant="body2">{orderData?.customerName || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Phone Number:</Typography>
                  <Typography variant="body2">{orderData?.customerNumber || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Address:</Typography>
                  <Typography variant="body2" sx={{ width: '60%' }}>
                    {`${orderData?.address?.house_number || ""}, ${orderData?.address?.address || ""}, ${orderData?.address?.landmark_area || ""}, ${orderData?.address?.zipCode || ""}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Date & Time:</Typography>
                  <Typography variant="body2">
                    {orderData?.createdAt
                      ? new Date(orderData.createdAt).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        })
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '40%' }}>Biller Name:</Typography>
                  <Typography variant="body2">Promode Agro Farm</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: '72%' }}>Billing Address:</Typography>
                  <Typography variant="body2">
                    Dargah khaleej khan, Kismatpur, Hyderabad, Telangana 500028, 9701610033
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Items Table */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Typography variant="body2">
                  Items: {orderData?.items?.length || 0}
                </Typography>
              </Box>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '15px'
                }}>
                  <thead>
                    <tr style={{ 
                      backgroundColor: '#1f9151',
                      color: '#fff'
                    }}>
                      <th style={{ padding: '8px', textAlign: 'center' }}>S.No</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Product Name</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Unit</th>
                      <th style={{ padding: '8px', textAlign: 'center' }}>Quantity</th>
                      <th style={{ padding: '8px', textAlign: 'center' }}>Rate</th>
                      <th style={{ padding: '8px', textAlign: 'center' }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData?.items?.map((item, index) => (
                      <tr key={index} style={{ 
                        backgroundColor: index % 2 === 0 ? '#f3f3f3' : '#ffffff',
                        fontSize: '14px'
                      }}>
                        <td style={{ padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.productName}</td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.quantityUnits}{item.unit}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>₹{item.price}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>₹{item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>

            {/* Summary */}
            <Box sx={{ mb: 3, mt: 30 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Sub Total</Typography>
                <Typography variant="body2">₹{orderData?.subTotal || "0.00"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Shipping Charges</Typography>
                <Typography variant="body2">₹{orderData?.deliveryCharges || "0.00"}</Typography>
              </Box>
              <Box sx={{ borderBottom: '1.5px dashed black', my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Grand Total</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>₹{orderData?.finalTotal || "0.00"}</Typography>
              </Box>
              <Box sx={{ borderBottom: '1.5px dashed black', my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Received</Typography>
                <Typography variant="body2">
                  ₹{orderData?.paymentDetails?.method === "Prepaid" ? orderData?.finalTotal : "0.00"}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Balance</Typography>
                <Typography variant="body2">
                  ₹{orderData?.paymentDetails?.method === "COD" ? orderData?.finalTotal : "0.00"}
                </Typography>
              </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ flex: 1, borderBottom: '1.5px dashed black' }} />
                <Typography variant="h6" sx={{ mx: 2, fontSize: '14px' }}>Thank You</Typography>
                <Box sx={{ flex: 1, borderBottom: '1.5px dashed black' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">www.promodeagro.com</Typography>
                <Typography variant="body2">FSSAI NO: 13624010000109</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">support@promodeagro.com</Typography>
                <Typography variant="body2">GSTIN NO: 36ABCFP1254A1ZS</Typography>
              </Box>
            </Box>

            {/* Download Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                color="success"
                onClick={downloadPDF}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <FileDownloadIcon />}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Invoice;

