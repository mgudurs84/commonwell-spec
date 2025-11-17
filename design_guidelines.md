# Design Guidelines: CommonWell Health Alliance API Documentation Viewer

## Design Approach: Material Design System

**Justification**: API documentation for business users requires clarity, professionalism, and efficient information access. Material Design provides the perfect foundation with its emphasis on hierarchy, clear typography, and consistent interaction patterns. This approach ensures trustworthiness and ease of use for technical and non-technical business stakeholders.

**Key Principles**:
- Information clarity over visual flourish
- Consistent, predictable interactions
- Professional, enterprise-ready aesthetic
- Efficient content scanning and navigation

## Typography System

**Primary Font**: Roboto (Material UI default)
- Page Title (H1): 2.5rem, weight 500, tight letter-spacing
- Section Headers (H2): 1.75rem, weight 500
- Subsection Headers (H3): 1.25rem, weight 500
- API Endpoint Titles: 1rem, weight 500
- Body Text: 0.875rem, weight 400, line-height 1.6
- Code/Technical Content: Roboto Mono, 0.813rem

**Hierarchy Strategy**:
- Use Material UI's Typography variants consistently (h1, h2, h3, body1, body2, caption)
- Maintain clear size relationships: each level should be distinctly smaller than the previous
- Apply medium weight (500) for headers, regular (400) for body content

## Layout & Spacing System

**Spacing Primitives** (Material UI spacing units):
- Use spacing units: 2, 3, 4, 6, 8 (e.g., spacing(2), spacing(4), spacing(8))
- Section padding: 8 units (top/bottom)
- Card padding: 3-4 units
- Content gaps: 2-3 units between related elements
- Component margins: 4 units between major components

**Container Strategy**:
- Main content: maxWidth="lg" (1280px) for optimal reading
- Sidebar (if used): Fixed width 280px, persistent on desktop
- Content area: Flexible with proper constraints

**Grid System**:
- Use Material UI Grid with 12-column layout
- Responsive breakpoints: xs, sm, md, lg, xl
- Request/Response columns: Side-by-side on md+, stacked on sm-

## Component Library

### Navigation & Organization

**Top AppBar**:
- Fixed position with elevation={2}
- Height: 64px
- Contains: Logo/Title (left), Search bar (center-right), User actions (right)
- Implement Material UI AppBar with Toolbar

**Sidebar Navigation** (Desktop):
- Width: 280px, fixed position
- Collapsible category groups using Material UI List with nested ListItems
- Categories: Patient Management, Document Retrieval, Notifications, etc.
- Active state highlighting with subtle background treatment
- Smooth expand/collapse animations using Collapse component

**Search Functionality**:
- Prominent search bar in AppBar (TextField with startAdornment icon)
- Real-time filtering of endpoints
- Clear visual feedback for active search state

### API Endpoint Cards

**Card Structure** (Material UI Card component):
- Elevation: elevation={1} default, elevation={3} on hover
- Border radius: 8px
- Margin bottom: spacing(3)

**Card Header** (Expandable):
- Padding: spacing(2, 3)
- Layout: HTTP Method Badge | Endpoint Title & Path | Expand Icon
- Clickable entire header area
- Smooth expansion using Accordion or custom Collapse

**HTTP Method Badges** (Material UI Chip):
- Size: small
- Variant: filled
- Width: 80px for consistency
- Text: Uppercase, weight 600

**Expanded Content Areas**:
- Padding: spacing(3)
- Sections: Description → Parameters → Request → Response
- Use Dividers between major sections

### Code Display

**Syntax Highlighting Blocks**:
- Material UI Paper component with dark variant
- Border radius: 4px
- Padding: spacing(2)
- Font: Roboto Mono, size 0.813rem
- Include copy button (IconButton) positioned top-right
- Use react-syntax-highlighter for JSON/XML formatting

**Parameter Lists**:
- Material UI Table (dense variant) for structured parameter documentation
- Columns: Name | Type | Required | Description
- Alternating row treatment for readability

### Interactive Elements

**Copy Buttons**:
- Icon-only IconButton with ContentCopy icon
- Position: absolute, top-right of code blocks
- Success feedback: Brief icon swap to CheckCircle with transition

**Expand/Collapse Icons**:
- Use ExpandMore icon with rotation animation
- Transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1)

**Category Filters** (if needed):
- Chip array for active filters
- Allow multi-select with visual active states

## Page Structure & Organization

**Header Section**:
- Spacious introduction area with page title, version info, last updated date
- Padding: spacing(8) top, spacing(6) bottom
- Typography: Use display variants for prominence

**Content Organization**:
- Group endpoints by logical categories (sections)
- Each section gets clear H2 header with appropriate spacing(6) margin-top
- Alphabetical or logical ordering within categories

**Footer**:
- Simple, minimal footer with version, copyright, support links
- Padding: spacing(4)
- Typography: caption variant

## Responsive Behavior

**Desktop (lg+)**:
- Sidebar + Content two-column layout
- Request/Response side-by-side

**Tablet (md)**:
- Collapsible sidebar (drawer)
- Request/Response side-by-side if space allows

**Mobile (sm, xs)**:
- Hidden sidebar, access via hamburger menu (Drawer)
- Stacked Request/Response blocks
- Simplified AppBar with essential actions only

## Animation & Transitions

**Minimal, Purposeful Animation**:
- Card elevation changes: transition 200ms
- Accordion expansion: use Material UI's built-in smooth transitions
- Sidebar drawer: slide transition 250ms
- Copy button feedback: icon crossfade 150ms
- NO decorative animations, scroll effects, or loading spinners unless data fetch requires

## Professional Polish

**Elevation Hierarchy**:
- AppBar: elevation={2}
- Cards: elevation={1}, hover elevation={3}
- Sidebar: elevation={0} (use border instead)
- Dialogs/Modals: elevation={8}

**Consistency Mandates**:
- All corners use 8px or 4px radius (never mix 6px, 12px, etc.)
- All cards use identical padding structure
- Maintain consistent icon sizes (20px or 24px throughout)
- All interactive elements have clear hover/focus states

**Accessibility**:
- Proper heading hierarchy (never skip levels)
- All interactive elements keyboard accessible
- Sufficient contrast ratios for all text
- ARIA labels for icon-only buttons
- Focus indicators on all focusable elements

This design creates a polished, professional API documentation interface that business users will find approachable and efficient, leveraging Material Design's strengths in information architecture and enterprise UX.