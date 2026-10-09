# INCIPE Learning Curriculum

## Program Introduction

This is a comprehensive 5-6 month "3-in-1" course covering Embedded Systems Programming, Algorithmic Thinking for Hardware, and Career Preparation for the IoT and Robotics Industry. The program is specifically designed for secondary to high school students (non-CS majors) who want to:

- Build their first physical products (an IoT Weather Station and a Game Console).
- Develop problem-solving skills through hardware-based algorithmic challenges.
- Prepare for internships in the fields of Embedded Systems, IoT, and Robotics.

## Program Objectives

Upon completion, students will be able to:

- **Build Physical Products:** Develop a complete IoT Weather Station and a custom Game Console using the INCIPE board.
- **Master Foundational Code:** Solidly understand the C/C++ programming language fundamentals crucial for embedded systems.
- **Develop Algorithmic Thinking:** Solve hardware-related algorithmic problems (e.g., sensor data filtering, motor control logic).
- **Utilize AI-Powered Tools:** Effectively use the INCIPE Workspace AI agents for code assistance, debugging, and firmware compilation while understanding the underlying code.
- **Create Professional Career Materials:** Build a related technical portfolio, form teams to join Hackathon and Competitions.

## Course Commitment

- **Updated Content:** Curriculum stays current with AI-assisted development and IoT trends.
- **Hands-on Learning:** High practice-to-theory ratio (65% practical).
- **1:1 Support:** AI Personalized guidance.
- **Parent Tracking Panel:** Dedicated dashboard for parents to track student progress, view completed sessions, exercise scores, and project milestones in real-time.

## Detailed Curriculum

### Part A - Theory (15% of total time)

#### M1: AI Literacy (5% of total time)

**Focus:** Understanding AI-assisted development workflows and fundamental tools

*Weeks 1-2 (4 Sessions)*

**Session 1: Introduction to AI Development Workflows**

- Overview of AI in embedded systems development.
- Understanding the role of AI agents, and that each has a different strength: Google Gemini for daily tasks, Claude Code and Codex as coding agents, Seedance for video, and INCIPE Workspace AI for hardware context.
- MCP: letting an AI agent use your other tools.
- How to prompt AI effectively for coding, debugging, and documentation.

**Session 2: AI-Powered Firmware Development**

- Using the INCIPE Workspace AI agent for firmware compilation.
- AI-assisted code review and optimization.
- Understanding the limits of AI: When to trust AI vs. when to write your own code.
- Practice: Use AI to generate a function that reads from the Temperature & Humidity Sensor, then manually optimize the memory usage.

**Session 3: Terminal Commands & Environment Setup**

- Essential terminal commands: `ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`.
- Navigating the file system and managing project directories.
- Introduction to Git and GitHub for version control.

**Session 4: Command Line for Embedded Development**

- Using the terminal to compile and upload firmware.
- Automated the process using INCIPE Board.


### Part B - Hardware Fundamentals (55% of total time)

####  M2: Fundamentals of Programming (C++) - Weeks 5-8 (8 Sessions)

**Session 1: Introduction to C++ for Embedded Systems**

- C++ syntax vs. C (differences and why C++ for modern embedded).
- Variables, data types, constants, and memory management (RAM vs. Flash).
- Practice: Blink an LED with the INCIPE board using digital outputs.
- AI Integration: Ask AI to generate a function and explain its logic.

**Session 2: Control Structures & Functions**

- Conditional statements (`if`, `else`, `switch`) for decision logic.
- Loops (`for`, `while`, `do-while`) for repetitive tasks.
- Writing reusable functions.
- Practice: Build a "Digital Dice" using the Button and LED Strip (press button → display random number on LEDs).
- AI Integration: Use AI to suggest error handling for button debouncing.

**Session 3: Arrays, Pointers, and Bitwise Operations**

- Working with arrays to store multiple sensor readings.
- Understanding pointers and references (essential for hardware manipulation).
- Bitwise operators (`&`, `|`, `^`, `<<`, `>>`) for register-level control.
- Practice: Read 10 values from the Light Intensity Sensor and compute the moving average using an array.

**Session 4: Structs & State Machines (FSM)**

- Defining and using `struct` to group related data (e.g., `SensorData`).
- Introduction to Finite State Machines (FSM) for complex logic.
- Practice: Design an FSM for a traffic light system using the LED Strip (Red → Yellow → Green → Red).
- AI Integration: Have AI review your FSM logic and suggest improvements.

#### M3: INCIPE Board, Sensors, and Modules Introduction - Weeks 9-13 (10 Sessions)

**Session 1: Analog Sensors & ADC**

- Understanding Analog-to-Digital Converters (ADC).
- Reading analog sensors: Soil Moisture, Light Intensity, Temperature & Humidity.
- Practice: Create a real-time dashboard in the Serial Monitor showing all analog sensor values.

**Session 2: Digital Sensors & Protocols (I2C, UART)**

- Introduction to I2C protocol for multi-sensor communication.
- Interfacing with the Accelerometer & Gyroscope.
- Practice: Read and interpret X, Y, Z acceleration data and print it to the Serial Plotter.

**Session 3: Actuators - PWM & Motor Control**

- Pulse Width Modulation (PWM) for speed/dimming control.
- Controlling the DC Motor and Servo Motor.
- Practice: Write code to sweep the Servo motor from 0° to 180° and control DC motor speed with a potentiometer.

**Session 4: Audio & Indicators**

- Generating tones and melodies with the Buzzer.
- Using the LED Strip for visual feedback.
- Using `millis()` for non-blocking timing.
- Practice: Create a simple melody and a "disco" mode for the Light Sensor.

**Session 5: Input Devices - Joystick, IR, and Buttons**

- Reading analog joystick data (X, Y, and button press).
- Decoding IR signals with the IR Receiver.
- Practice: Build a simple menu system controlled by the Joystick and displayed on the Serial Monitor.

**Session 6: Data Logging with SD Card**

- Writing to the SD Card module.
- Creating CSV files for time-series data logging.
- Practice: Log all sensor data (Temperature, Humidity, Light, Soil Moisture) to an SD card every 5 seconds.

**Session 7: Communication - IR Transmitter & Receiver**

- Transmitting IR signals with the IR Transmitter.
- Creating a universal remote clone project.
- Practice: Record a remote control signal and replay it to control the LED Strip.

**Session 8: Integration - Building the Smart Garden System**

- Combining multiple sensors (Soil Moisture, Temperature & Humidity, Light Intensity).
- Actuators: Water Pump, Servo Motor (for opening windows), and LED Strip.
- Practice: Automate watering based on moisture levels and turn on grow lights based on light intensity.
- AI Integration: Use AI to design the automation logic and suggest optimal thresholds.

**Session 9: Integration - Building the Game Console**

- Combining the Joystick, IR Receiver, Button, and LED Strip.
- Creating a "Snake" or "Pong" game using the LED Strip as a display.
- Practice: Map joystick inputs to game movements and display game state on LEDs.

**Session 10: System Integration & Debugging**

- Final integration of all modules.
- Debugging techniques: Serial print statements, logic analyzers, and AI-assisted debugging.
- Practice: Full system test of the Smart Garden and Game Console projects.
- AI Integration: Use AI to simulate edge cases and suggest robustness improvements.

#### M4: Ideation (10% of total time)

**Focus:** Design Thinking, Problem Definition, and Product-Market Fit

*Weeks 3-4 (2 Sessions)*

**Session 1: Design Thinking & Problem Statement**

- Empathy: Identifying user pain points in everyday life (e.g., plant care, home security, gaming).
- Define: Crafting a clear problem statement using the "How Might We" framework.
- Ideate: Brainstorming solutions using the INCIPE sensors and actuators.
- Workshop: Group brainstorming session to ideate 5 potential IoT product ideas using the INCIPE ecosystem.

**Session 2: Product-Market Fit & Solution Validation**

- What is Product-Market Fit and why it matters for internships/portfolios.
- Identifying your target audience (e.g., urban gardeners, elderly care, kids learning to code).
- Prototyping your solution: Quick sketches and flowcharts.
- Practice: Create a Lean Canvas for your chosen product idea (Smart Garden or Game Console).
- Assignment: Select your final project concept and prepare a 3-minute problem statement pitch.

##### Real-life Projects (20% of total time)

There are 3 segmented projects. Students must choose 2 over 3 options to do in order to pass the course.

**Project 1: Robotics**

- Build a line-following robot using IR sensors and DC motors.
- Implement obstacle avoidance with ultrasonic distance sensor.
- Control robot via Bluetooth using a mobile app.
- Deliverable: Fully autonomous robot with manual override mode.

**Project 2: AI Voice Control (IoT)**

- Integrate voice recognition module with INCIPE board.
- Control home appliances (lights, fan, motor) via voice commands.
- Build a dashboard to show voice command history and device status.
- Deliverable: Voice-controlled smart home prototype.

**Project 3: Game Development with Sensors**

- Design a motion-controlled game using Accelerometer & Gyroscope.
- Build a racing game controlled by tilting the board.
- Add joystick for menu navigation and IR for multiplayer mode.
- Deliverable: Fully playable game console with physical controller.

### Part D - Portfolio Building (10% of total time)

#### M5: Presentation Training (5% of total time)

**Focus:** Product Pitching and Presentation Skills

*Weeks 14-15 (4 Sessions)*

**Session 1: Storytelling & Product Pitching**

- Structure of a compelling pitch: Problem → Solution → Technology → Impact.
- Using the "Hero's Journey" framework for product storytelling.
- Workshop: Draft a 5-minute pitch script for your Smart Garden or Game Console.

**Session 2: Presentation Techniques**

- Visual aids: Creating effective slides with diagrams and demos.
- Body language, voice modulation, and handling nerves.
- Live demo best practices (always have a backup plan!).
- Practice: Present your product to a small group for peer feedback.

**Session 3: Technical Presentation Skills**

- Explaining complex technical concepts to non-technical audiences.
- How to present your code architecture and system design.
- Mock Presentation: Present your product architecture (sensors, actuators, firmware, AI usage) to the class.

**Session 4: Final Pitch & Career Preparation**

- Final polishing of the pitch deck and project documentation.
- Creating a demo video for your portfolio.
- Final Showcase: Live product pitch and demo to a panel of instructors and industry guests.

*Week 16: Portfolio Build and Knowledge Revision*

**Session 5: Portfolio & Project Showcase**

- Documenting the hardware and software projects (Schematics, Code, UI).
- Recording demo videos and writing thorough project descriptions.
- Practice: Create a dedicated "Projects" section on your portfolio.

**Session 6: Technical Knowledge Prep**

- Review of C/C++ knowledge, memory management, and interrupt handling.
- Mock Interview: Simulated technical questions about sensors, protocols (I2C, UART, SPI), and motor control.

*Week 17: How to make use of your technical Portfolio*

**Session 7: Building a Technical CV & LinkedIn**

- Highlighting hardware and IoT projects.
- Optimizing for ATS (Applicant Tracking Systems) in the tech industry.
- Workshop: Creating an impressive LinkedIn profile targeted at IoT/Robotics roles.

**Session 8: Application Strategy & Networking**

- Effective job portals for embedded/IoT roles.
- Professional email templates for applying to internships.
- Final Step: Creating your personalized application plan.

## Assessment & Progress Tracking

- **Continuous Assessment:** Practical exercises after each session.
- **Certificate Requirement:** Complete above 80% of individual quiz and successfully build 2 over 3 Real-life Project Options.
- **Phase Assessments:**
  - End of M1: Quiz on AI workflows and terminal commands.
  - End of M2: Presentation of problem statement and Lean Canvas.
  - End of M3 (Product Dev): Project showcase (Smart Garden & Game Console).
- **Final Assessment:**
  - Comprehensive Portfolio Review (code, schematics, demo videos).
  - Final Pitch Presentation (M4).
  - Mock Interview focusing on technical and behavioral questions.
- **Parent Tracking Panel:** Real-time dashboard for parents to monitor:
  - Completed sessions and upcoming schedule.
  - Exercise scores and quiz results.
  - Project milestones and deliverables.
  - Overall progress percentage.
  - Instructor feedback and recommendations.

## Target Audience

This course is perfect for:

- Primary or Secondary students who are passionate about robotics and making things.
- High school students (non-CS) wanting to transition into tech/hardware, or build their activities for college application.
- Beginners wanting a structured, project-based path into Embedded Systems.
- Young individuals looking to secure an internship in a technology field.

## Summary Course Information

- **Duration:** 5-6 months (28 sessions total split into small videos and exercises).
- **Format:** Online short video course. Each session includes 1-2 minute instructional videos alongside exercises, followed by hands-on practice with the INCIPE Board.
- **Cost:** Kits and Token under Educational for Organization Plan.
- **Kit:** INCIPE Ecosystem Board with all listed sensors and actuators is included/available for purchase.
- **Parent Tracking Panel:** Included for all parents to monitor student progress and engagement.
