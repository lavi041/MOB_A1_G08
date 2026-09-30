import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = "evidence/TEST_LOG.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
)

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#1E293B'),
    fontName='Helvetica-Bold',
    spaceAfter=6
)

h2_style = ParagraphStyle(
    'SectionHeader',
    parent=styles['Heading2'],
    fontSize=13,
    leading=16,
    textColor=colors.HexColor('#0F172A'),
    fontName='Helvetica-Bold',
    spaceBefore=10,
    spaceAfter=6
)

normal_style = ParagraphStyle(
    'NormalText',
    parent=styles['Normal'],
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor('#334155'),
    fontName='Helvetica'
)

bold_style = ParagraphStyle(
    'BoldText',
    parent=normal_style,
    fontName='Helvetica-Bold'
)

pass_style = ParagraphStyle(
    'PassText',
    parent=normal_style,
    fontName='Helvetica-Bold',
    textColor=colors.HexColor('#166534')
)

elements = []

# Title
elements.append(Paragraph("MOB_A1_G08 — Comprehensive Test Log", title_style))
elements.append(Paragraph("<b>Project:</b> Musanze Safe Markets &nbsp;|&nbsp; <b>Verification Code:</b> MOB-G08-7104 &nbsp;|&nbsp; <b>Date:</b> September 30, 2026", normal_style))
elements.append(Spacer(1, 8))
elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563EB'), spaceAfter=12))

# Section 1: Environment & Roles
elements.append(Paragraph("1. Test Environment & Team Execution", h2_style))
env_text = """
<b>Execution Team:</b> Aisha (Product & UX Lead) and Kassim (State & Navigation Engineer), with quality oversight by Mahgoub (QA Lead) and the G08 Team.<br/>
<b>Test Environment:</b> Ubuntu Linux, Node.js v22.22.1, Expo Go App, Android Device (Samsung Galaxy A05).<br/>
<b>Testing Methodology:</b> Live manual testing on physical hardware connected via standard network / Expo tunnel.
"""
elements.append(Paragraph(env_text, normal_style))
elements.append(Spacer(1, 10))

# Section 2: Results Table
elements.append(Paragraph("2. Test Suite Execution Results", h2_style))

table_data = [
    [Paragraph("<b>#</b>", bold_style), Paragraph("<b>Test Name</b>", bold_style), Paragraph("<b>Description / Scope</b>", bold_style), Paragraph("<b>Tested By</b>", bold_style), Paragraph("<b>Status</b>", bold_style)],
    ["1", "Launch", "App boot, splash screen, base navigation load", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["2", "Catalog", "Market product catalog list rendering", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["3", "Invalid Form", "Form validation on incorrect/missing input", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["4", "Valid Form", "Successful form submission & state update", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["5", "Navigation", "Tab & stack screen transitions", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["6", "Permission", "Device media/camera permission handling", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["7", "Image", "Image picker selection & display verification", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["8", "Responsive", "UI layout adaptation across screen sizes", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["9", "Evidence", "Artifact compilation & demo video validation", "Aisha & Kassim", Paragraph("PASS", pass_style)],
    ["10", "Live Change", "Hot-reload state update (APP_NAME update)", "Aisha & Kassim", Paragraph("PASS", pass_style)],
]

t = Table(table_data, colWidths=[25, 80, 240, 110, 55])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
    ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#0F172A')),
    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
]))
elements.append(t)
elements.append(Spacer(1, 12))

# Section 3: Summary Sign-off
elements.append(Paragraph("3. Sign-off & Verification", h2_style))
sign_off = """
All 10 test scenarios were systematically validated on actual device hardware. The system passed all functionality, validation, UI responsiveness, and real-time state modification benchmarks without runtime errors.
"""
elements.append(Paragraph(sign_off, normal_style))

doc.build(elements)
print("TEST_LOG.pdf generated successfully in evidence/")
