Below is a **complete master prompt you can give your developer (or AI code generator like Qwen/Bolt)** to implement the **User Dashboard Task System for all Legacy Projects**.
It clearly explains **what the user sees, what they must fill, and how the submission works**.

The idea is simple:
Every participant submits **1 activity per month** related to their **Legacy Project**.

No file uploads.
Only **structured reporting fields**.

---

# MASTER PROMPT

## Legacy Projects – User Dashboard Contribution System

Build a **User Dashboard Contribution Module** for participants enrolled in Legacy Projects.

Users are contributors.
They must submit **one activity report per month** related to the legacy project they joined.

No file uploads are required.

All submissions must follow a **structured reporting format** and will be visible publicly **only after Super Admin approval**.

---

# 1. Dashboard Layout

Inside the user dashboard create a section called:

**My Legacy Program**

This section shows:

Program Name
Contribution Requirement
Contribution Status
Contribution History

Example:

```
Program: Environmental Programs

Monthly Contribution Requirement: 1 activity

This Month Status: Pending Submission
```

If submitted:

```
This Month Status: Submitted – Pending Approval
```

If approved:

```
This Month Status: Approved
```

---

# 2. Submit Monthly Contribution Button

Inside the dashboard display a button:

**Submit Monthly Contribution**

Clicking this opens the **Contribution Submission Form**.

---

# 3. Universal Contribution Form Structure

All legacy programs use the same form structure.

Fields required:

**Contribution Title**

**Legacy Program**
(auto-filled based on user's program)

**Date of Activity**

**Venue / Location**

City
Country

**Number of Participants**

**Participants Phone Numbers**

User enters multiple phone numbers separated by commas.

Example:

```
+1-916-699-0091, +91-9876543210
```

**Participants Email Addresses**

Example:

```
john@email.com, sara@email.com
```

---

# 4. Program-Specific Task Description

Each legacy program should show **instructions above the form** explaining the expected task.

---

## Healing Initiatives

Instruction text shown to user:

```
Organize a small reflection or discussion circle focused on compassion, emotional well-being, or ethical living.

Discuss challenges people face and explore ways to cultivate inner discipline and understanding.

After conducting the activity, submit the report below.
```

User fills:

**Task Conducted**

Example:

```
Facilitated a reflection circle discussing patience, forgiveness, and emotional balance in daily life.
```

**Results / Outcomes**

Example:

```
Participants shared personal experiences and discussed practical approaches for improving emotional awareness and compassion.
```

---

## Environmental Programs

Instruction text:

```
Organize a discussion or observation related to environmental awareness, sustainability, or traditional ecological practices.

This may involve artisans, students, or community members discussing environmentally responsible practices.
```

Fields:

Task Conducted

Example:

```
Discussion with local artisans about natural dyes and environmentally sustainable craft production methods.
```

Results

Example:

```
Participants identified several plant-based dyes traditionally used in wool production and discussed ways to reduce chemical dye usage.
```

---

## Youth Engagement

Instruction text:

```
Organize a youth dialogue focused on leadership, responsibility, or community engagement.
```

Fields:

Task Conducted

Example:

```
Hosted a youth leadership discussion exploring ethical responsibility and community service.
```

Results

Example:

```
Participants expressed interest in organizing volunteer activities and community initiatives.
```

---

## Sufi Music

Instruction text:

```
Host a small listening session or discussion about spiritual music or devotional poetry.
```

Fields:

Task Conducted

Example:

```
Conducted a listening and discussion session exploring themes of devotion and humility in spiritual music.
```

Results

Example:

```
Participants reflected on how music influences emotional and spiritual awareness.
```

---

## Sufi Ecommerce

Instruction text:

```
Engage with artisans or community members to discuss ethical trade, craftsmanship, and sustainable livelihoods.
```

Fields:

Task Conducted

Example:

```
Discussion with artisans about fair pricing and preserving traditional craft production.
```

Results

Example:

```
Participants discussed challenges artisans face and identified opportunities for ethical marketplace connections.
```

---

## Sufi Science

Instruction text:

```
Organize a discussion exploring the relationship between knowledge, ethics, and intellectual inquiry.
```

Fields:

Task Conducted

Example:

```
Facilitated a discussion on the relationship between scientific knowledge and ethical responsibility.
```

Results

Example:

```
Participants explored philosophical questions about knowledge, responsibility, and societal impact.
```

---

## Interfaith Program

Instruction text:

```
Conduct a dialogue or conversation about shared ethical values across different traditions or communities.
```

Fields:

Task Conducted

Example:

```
Facilitated an interfaith dialogue exploring shared teachings about compassion and justice.
```

Results

Example:

```
Participants recognized common ethical values and expressed interest in future dialogue sessions.
```

---

# 5. Submission Button

At the bottom of the form:

**Submit Contribution for Review**

After submission show message:

```
Your contribution has been submitted successfully.
It will become visible publicly after Super Admin approval.
```

Status becomes:

**Pending Review**

---

# 6. Contribution History Section

Dashboard also shows previous submissions.

Example table:

| Contributor | Program       | Date   | Venue    | Participants | Status   |
| ----------- | ------------- | ------ | -------- | ------------ | -------- |
| Ahmed       | Environmental | 10 Mar | Srinagar | 6            | Approved |
| Ahmed       | Environmental | 12 Apr | Srinagar | 5            | Pending  |

---

# 7. Super Admin Approval

Admin panel shows:

Contributor
Program
Date
Venue
Participants
Task
Results

Admin options:

Approve
Reject
Request Revision

Only **approved contributions** are visible publicly.

---

# 8. Public Website Display

Approved contributions appear on the website.

Example:

Environmental Program Activity

Location: Srinagar
Participants: 6

Task
Discussion on sustainable craft materials.

Results
Participants identified plant-based dyes used in traditional wool production.

Contributor
Ahmed Khan

---

# 9. Homepage Recognition

System automatically calculates contributors with **highest approved contributions**.

Front page shows:

**Top Contributors – This Month**

Top 3 contributors per legacy program.

---

# Final System Logic

```
User joins legacy program
↓
User submits monthly contribution
↓
Super Admin reviews
↓
Approved contributions become public
↓
Top contributors appear on homepage
```

---

If you want, I can also give you **one advanced improvement that will make this system extremely powerful globally without increasing storage or complexity.**