import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportRoadmapToPDF(elementId: string, title: string = 'SkillGraph-Roadmap') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found for PDF export.`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#090d16',
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width mm
    const pageHeight = 295; // A4 height mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback: window print
    window.print();
  }
}
