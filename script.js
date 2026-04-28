// --- 1. FIREBASE SETUP & IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMwLeOI2D6Wd43kMHHU_4HUjM16atTRdo",
    authDomain: "bfe-exam.firebaseapp.com",
    projectId: "bfe-exam",
    storageBucket: "bfe-exam.firebasestorage.app",
    messagingSenderId: "246157239224",
    appId: "1:246157239224:web:12532d565c6fbbeee9e54d",
    measurementId: "G-W35MQNM54F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// --- 2. RAW QUESTION DATA ---
const rawDataString = `
[Assignment 1]
1. Which of the following is an Indian-origin diversified business group that operates across multiple industries? a. Unilever b. Tata Group c. Amazon d. Microsoft | Ans: Tata Group
2. Which of the following aspects best represents the 'social environment' of a business organization? a. Social values and cultural traditions b. Interest rates and inflation c. Industrial production levels d. Technological investments | Ans: Social values and cultural traditions
3. Which among the following indicators best describes the 'economic environment' of a business? a. Workforce education levels b. Cost of labour and energy c. Legal framework d. Cultural diversity | Ans: Cost of labour and energy
4. Which of the following is an example of an emerging technology transforming industries worldwide? a. Textile manufacturing b. Artificial intelligence c. Coal mining d. Agriculture | Ans: Artificial intelligence
5. In Michael Porter's Value Chain framework, which of the following is classified as a primary activity? a. Human resource management b. Firm infrastructure c. Marketing and sales d. Technology development | Ans: Marketing and sales
6. As an automobile entrepreneur planning a new car model, which approach aligns best with creating superior customer value? a. Focus only on speed, ignoring price and comfort b. Focus only on cost reduction, ignoring performance and design c. Combine quality, affordability, and user satisfaction to exceed market expectations d. Avoid new launches due to high competition | Ans: Combine quality, affordability, and user satisfaction to exceed market expectations
7. Which skill is most essential to build a successful entrepreneurial career in today's environment? a. Ability to analyse complex problems and design practical solutions b. Ability to memorize large amounts of irrelevant information c. Ability to multitask without focus d. Ability to spend long hours on social media | Ans: Ability to analyse complex problems and design practical solutions
8. Which of the following accurately defines a 'company' under Indian law? a. A voluntary association with perpetual succession and limited liability b. A temporary group of individuals for a single project c. A natural person with citizenship rights d. A government agency with full control over trade | Ans: A voluntary association with perpetual succession and limited liability
9. How are employees in an organization structured into senior, middle, and operational levels? a. Based on experience, role, and decision-making authority b. Based on their ability to speak multiple languages c. Randomly, without any logic d. Based on personal preferences | Ans: Based on experience, role, and decision-making authority
10. Under the Companies Act, 2013, which of the following statements is correct? a. Section 8 companies are registered for charitable purposes b. One-person companies cannot have any directors c. Private companies can have only one shareholder d. Public companies can issue shares only to government entities | Ans: Section 8 companies are registered for charitable purposes
11. Which of the following definitions best describes a startup in the Indian context? a. Any firm less than 10 years old working on innovative and scalable business models b. Any small family business operating for less than 5 years c. Any tech company registered abroad d. Any unregistered small-scale trader | Ans: Any firm less than 10 years old working on innovative and scalable business models
12. In startup terminology, what does the term 'unicorn' refer to? a. A privately held startup valued at over 1 billion USD b. A company owned by the government c. A startup operating only in rural areas d. A new company with less than 10 employees | Ans: A privately held startup valued at over 1 billion USD
13. Which of the following is NOT required when registering a company in India? a. Certificate of incorporation b. Director identification number c. MCA portal registration d. Mandatory foreign office location | Ans: Mandatory foreign office location
14. Which of the following statements best defines a conglomerate? a. A corporation consisting of multiple, diversified businesses & companies under one parent group b. A partnership firm with a single product line c. A specialized trading company d. A consulting agency | Ans: A corporation consisting of multiple, diversified businesses & companies under one parent group
15. Which of the following is an example of an Indian conglomerate? a. Aditya Birla Group b. Toyota c. Amazon d. Apple | Ans: Aditya Birla Group

[Assignment 2]
1. Which of the following best describes the primary purpose of a company's vision statement? a. To describe the exact tasks employees must perform daily. b. To define what the company aims to become in the long run. c. To outline the current year's financial targets. d. To specify the personal goals of the company's CEO. | Ans: To define what the company aims to become in the long run.
2. Which of the following is a correct understanding of company culture? a. The shared values, actions, and behaviour patterns shown by employees and leaders. b. A document containing rules that are never followed in real life. c. The company's annual bonus policy. d. Only the official dress code followed by employees. | Ans: The shared values, actions, and behaviour patterns shown by employees and leaders.
3. In the context of the course discussion on Purpose Statements, companies write them primarily to... a. Replace their financial mission statement. b. Restrict employee freedom in decision-making. c. Avoid long-term planning and public communication. d. Communicate why they exist and what motivates their work. | Ans: Communicate why they exist and what motivates their work.
4. Which of the following options does not represent a good company value? a. Integrity in all actions. b. Respect and collaboration. c. Profit-making at any cost, even if it harms society or nature. d. Innovation and curiosity. | Ans: Profit-making at any cost, even if it harms society or nature.
5. According to the course, company values refer to... a. Core beliefs that guide employee decisions and organizational behaviour. b. A set of slogans used only for marketing. c. Individual opinions that differ daily. d. Financial ratios used for evaluating performance. | Ans: Core beliefs that guide employee decisions and organizational behaviour.
6. Which of the following is true about company strategy as discussed in the course? a. It refers to unplanned and spontaneous decisions. b. It includes deliberate actions taken to achieve one or more organizational goals. c. It is limited to financial planning only. d. It can never involve multiple objectives. | Ans: It includes deliberate actions taken to achieve one or more organizational goals.
7. Which of the following statements is not aligned with the case discussion on the Tata Group's Code of Conduct? a. The Tata Group maintains a written code serving as an ethical guide for its companies. b. The code emphasizes integrity, responsibility, and fairness. c. The Tata Group has no documented ethical standards. d. It provides a roadmap for expected conduct among employees. | Ans: The Tata Group has no documented ethical standards.
8. Based on the mini case on Procter & Gamble's (P&G) Principles, which of the following is correct? a. P&G avoids discussions around ethical business practices. b. P&G supports data-free or emotion-driven decisions. c. P&G discourages innovation in product development. d. P&G focuses on work that contributes meaningful value to the business. | Ans: P&G focuses on work that contributes meaningful value to the business.
9. Which of the following is true regarding strategic assessment? a. External assessment helps understand the company's position among its customers and market environment. b. Internal assessment deals with competitors and government policy only. c. Companies should skip assessments because markets change unpredictably. d. It can only be performed by external consultants. | Ans: External assessment helps understand the company's position among its customers and market environment.
10. According to the discussion on mission statements, which of the following does not describe its purpose? a. Explaining whom the company serves and what it aims to achieve. b. Clarifying the company's role and long-term objectives. c. Stating who the CEO is and where the head office is located. d. Reflecting the organization's reason for existence. | Ans: Stating who the CEO is and where the head office is located.
11. Which of the following is true about SWOT Analysis as discussed in the course? a. The acronym stands for Sales, Work, Operations, and Trade. b. SWOT has no relevance to business strategy. c. Threats are always beneficial for a company. d. Identifying opportunities can help expand business reach and market share. | Ans: Identifying opportunities can help expand business reach and market share.
12. In the case discussion on Nestlé, which of the following statements is correct? a. The company ignored product innovation. b. Regaining a competitive cost structure was identified as a way to strengthen core operations. c. It did not focus on sustainability or waste reduction. d. It planned to exit the food and beverage sector entirely. | Ans: Regaining a competitive cost structure was identified as a way to strengthen core operations.
13. Which of the following best describes the vision and mission of the Godrej Group, as referenced in the course? a. Their purpose focuses on progress across generations with innovation and trust. b. Their mission is only to increase market share in real estate. c. Entrepreneurship has no place in their values. d. They do not have any formal purpose or mission statement. | Ans: Their purpose focuses on progress across generations with innovation and trust.
14. According to the discussion on change management and cultural transformation, which of the following is correct? a. Cultural transformation happens automatically without effort. b. Only top management can execute change successfully. c. Transformation can be achieved by continuous coaching, reskilling, and communication. d. It is impossible to alter organizational culture. | Ans: Transformation can be achieved by continuous coaching, reskilling, and communication.
15. Which of the following accurately reflects the purpose of a company's purpose, values, and principles framework as discussed in the course? a. It focuses exclusively on financial audits and budgets. b. It only describes employee dress codes and working hours. c. It functions solely as an HR policy for recruitment. d. It ensures alignment between leadership intent, employee behaviour, and organizational goals. | Ans: It ensures alignment between leadership intent, employee behaviour, and organizational goals.

[Assignment 3]
1. Which of the following statements best defines mass production in a business context? a. Manufacturing a limited number of products for exclusive customers. b. Producing standardized goods on a large scale with efficient processes. c. Producing customized items manually for niche segments. d. Designing prototypes for one-time exhibitions only. | Ans: Producing standardized goods on a large scale with efficient processes.
2. Which of the following is an example of a disruptive innovation, as discussed in the course? a. A new car colour shade. b. A company updating its logo. c. A faster elevator in a single building. d. Electric vehicles replacing internal combustion engines. | Ans: Electric vehicles replacing internal combustion engines.
3. In the context of this course, a drone refers to... a. A remotely operated or autonomous aircraft used for specific tasks. b. A species of migratory bird. c. A type of wireless headphone. d. A high-speed train. | Ans: A remotely operated or autonomous aircraft used for specific tasks.
4. Which of the following questions is least relevant when identifying innovation drivers for a company's new product? a. What problem does the customer face today? b. Who are the primary competitors in this space? c. What is today's weather forecast? d. What price range would the target customer prefer? | Ans: What is today's weather forecast?
5. In the context of this course, Generative Al tools like ChatGPT are examples of... a. Machine learning models capable of generating human-like responses. b. Apps used for social media networking. c. Accounting automation systems. d. Cloud storage applications. | Ans: Machine learning models capable of generating human-like responses.
6. Which of the following options represents the correct problem-solution fit? a. Need to relax - Computer chip. b. Need to store information - Flash drive. c. Need to measure distance - Microphone. d. Need to communicate wirelessly - Chalkboard. | Ans: Need to store information - Flash drive.
7. In a manufacturing setup, which of the following would not be considered a core element of the production process? a. Procurement of parts and raw materials. b. Assembling and testing of products. c. Maintaining product quality standards. d. Designing company uniforms. | Ans: Designing company uniforms.
8. Which of the following statements best describes an assembly line? a. A system that divides production into a sequence of well-defined steps. b. A meeting area for employees. c. A strategy used in retail marketing. d. A process of assembling employees for training sessions. | Ans: A system that divides production into a sequence of well-defined steps.
9. As per this course, the term logistics refers to... a. The organized movement and storage of goods and related data across the supply chain. b. Mathematical logic applied in computer coding. c. A company's internal accounting structure. d. Distribution of employee tasks within departments. | Ans: The organized movement and storage of goods and related data across the supply chain.
10. If you are preparing product specifications, which of the following is not a relevant question? a. What is the ideal customer use case? b. What key features will the product include? c. What benefits will the user gain from it? d. Who will design the office space for the product team? | Ans: Who will design the office space for the product team?
11. As discussed in this course, if you are leading your company's procurement process, you must... a. Ignore price negotiation to save time. b. Avoid comparing supplier performance. c. Identify and engage reliable external suppliers. d. Outsource all orders without any checks. | Ans: Identify and engage reliable external suppliers.
12. Which of the following food products would be considered minimally processed? a. Instant noodles. b. Frozen peas. c. Chocolate bar. d. Cheese sandwich. | Ans: Frozen peas.
13. Which of the following combinations correctly represents types of innovation as per the course? a. New to world - Breakthrough innovation. b. New to market - Obsolete technology. c. New to company - Products discontinued by the company. d. New to customer - Untested Prototype only. | Ans: New to world - Breakthrough innovation.
14. Which of the following statements about innovation management is correct? a. Innovation is limited to product design alone. b. Innovation happens automatically without any planning. c. Innovation requires time, focus, and dedicated resources. d. Innovation excludes customer involvement. | Ans: Innovation requires time, focus, and dedicated resources.
15. The acronym FMCG stands for... a. Functional Management for Companies. b. Fully Managed Corporate Group. c. Fast Manufactured Car Goods. d. Fast Moving Consumer Goods. | Ans: Fast Moving Consumer Goods.

[Assignment 4]
1. Which of the following statements best describes financial management, as discussed in the course? a. Managing only the cash inflow of a company without planning or control. b. Effective planning, acquiring, utilization, and monitoring of financial resources to maximize organizational returns. c. Handling day-to-day operations unrelated to money or budgeting. d. Deciding employee salaries and attendance schedules. | Ans: Effective planning, acquiring, utilization, and monitoring of financial resources to maximize organizational returns.
2. In accounting, source documents are important because they... a. provide original evidence of financial transactions including date, details, and authorization. b. only show the total profit or loss at year end. c. do not require any verification or signatures. d. are optional and maintained only by government firms. | Ans: provide original evidence of financial transactions including date, details, and authorization.
3. Which of the following statements correctly explains financial statements? a. They exclude data about company revenues or assets. b. They only track employee performance. c. They are informal notes exchanged between departments. d. They summarize the business activities and financial results of a company over a period. | Ans: They summarize the business activities and financial results of a company over a period.
4. Human Resource Management (HRM) teams primarily... a. focus on inventory and asset management. b. handle only payroll processing without concern for employee welfare. c. manage employee policies, their development and performance in alignment with company goals. d. ignore legal and compliance responsibilities. | Ans: manage employee policies, their development and performance in alignment with company goals.
5. Which of the following best describes a journal entry in accounting? a. It is a systematic record of each financial transaction made by a business as per accounting standards. b. It records only income but not expenses. c. It refers to informal daily notes kept by company executives. d. It includes only credit entries but not debits. | Ans: It is a systematic record of each financial transaction made by a business as per accounting standards.
6. Which of the following statements correctly defines accounting as discussed in the course? a. A random recording of numbers in a notebook. b. A process of collecting, analysing, recording, and communicating financial information of a business. c. Only tracking how much profit a company earns annually. d. A task performed once a year for tax filing purposes. | Ans: A process of collecting, analysing, recording, and communicating financial information of a business.
7. In the context of performance management, which of the following activities is essential? a. Planning only for high performers while ignoring the rest b. Avoiding feedback discussions to prevent employee discomfort. c. Ignoring data from performance appraisals. d. Reviewing and assessing outcomes against set goals to identify improvement areas. | Ans: Reviewing and assessing outcomes against set goals to identify improvement areas.
8. Which of the following is a leadership quality emphasized in this course? a. Inspiring others through a clear vision and shared goals. b. Delegating every decision to subordinates without direction. c. Avoiding communication with teams to maintain authority. d. Leading through strict rules without emotional intelligence. | Ans: Inspiring others through a clear vision and shared goals.
9. Which of the following is not considered a key financial indicator for a company such as Larsen & Toubro? a. Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA). b. Order inflows and project revenue. c. Employee personal spending on household expenses. d. Cash flow and profitability ratios. | Ans: Employee personal spending on household expenses.
10. Which of the following factors most strongly influences employee satisfaction according to this course? a. Frequent job transfers without consultation. b. Opportunity to contribute to meaningful and purposeful work. c. Lack of feedback from management. d. Excessive workload without recognition. | Ans: Opportunity to contribute to meaningful and purposeful work.
11. Which of the following is true about accounting journals? a. They are only used for monthly reporting. b. They ignore debit and credit principles. c. They are optional for businesses following IFRS. d. They record all transactions chronologically and indicate which accounts are debited or credited. | Ans: They record all transactions chronologically and indicate which accounts are debited or credited.
12. In the context of this course, ESG stands for... a. Employment, Safety, and Grants. b. Environment, Sales, and Growth. c. Environmental, Social, and Governance. d. Enterprise, Systems, and Goals. | Ans: Environmental, Social, and Governance.
13. According to the Triple Bottom Line framework, a sustainable business focuses on... a. People, Planet, and Profit. b. Purpose, Policies, and Payroll. c. Price, Product, and Promotion. d. Profit, Publicity, and Politics. | Ans: People, Planet, and Profit.
14. In ESG terminology, which of the following represents a governance factor? a. Use of office stationery. b. Number of tourism spots near company offices. c. Daily commute distance of employees. d. Ethical decision-making and transparency in operations. | Ans: Ethical decision-making and transparency in operations.
15. Which of the following statements correctly reflects the importance of ESG for businesses? a. ESG should be avoided because it increases compliance costs. b. Integrating ESG practices can improve long-term returns and strengthen brand reputation. c. ESG is only relevant for non-profit organizations. d. ESG reporting is unnecessary as it is purely voluntary worldwide. | Ans: Integrating ESG practices can improve long-term returns and strengthen brand reputation.

[Assignment 5]
1. Which of the following statements most accurately explains market research as covered in the course? a. Market research focuses only on analysing customer feedback b. Market research excludes technology and product-related studies c. Market research involves a structured analysis of markets, customers, competitors, products, and technological trends d. Market research is limited to studying past sales performance | Ans: Market research involves a structured analysis of markets, customers, competitors, products, and technological trends
2. You have joined an agritech startup that provides drone-based services to large farms. You are asked to design a comprehensive market research plan. Which of the following elements should be included in your plan? a. Market share of existing competitors in the same operating region b. Features and service offerings of newly launched competing drone startups c. Monthly volume of drone services or units sold by competitors d. Interior design plans of competitor offices | Ans: Market share of existing competitors in the same operating region, Features and service offerings of newly launched competing drone startups, Monthly volume of drone services or units sold by competitors
3. You are interviewing candidates for a marketing intern role to strengthen market research for your mobile application. Which candidate responses reflect a correct understanding of market research? a. Candidate 1 - Analyzing how customers purchase helps optimise marketing channels b. Candidate 2 - Understanding pricing sensitivity helps determine pricing strategies c. Candidate 3 - Focusing only on current customers is sufficient d. Candidate 4 - Studying competitor acquisition strategies is irrelevant | Ans: Candidate 1 - Analyzing how customers purchase helps optimize marketing channels, Candidate 2 - Understanding pricing sensitivity helps determine pricing strategies
4. A beginner learner lists some sources of market research. Which statements are correct? a. Publicly available databases can be used for secondary research b. Observing customers is not research c. Al-assisted online searches can support secondary research d. Field observation is irrelevant | Ans: Publicly available databases can be used for secondary research, Al-assisted online searches can support secondary research
5. Which statement correctly describes the usefulness of Google Trends for entrepreneurs? a. It predicts exact future revenue b. It is usable only by data scientists c. It helps identify public interest patterns over time d. It replaces all primary research | Ans: It helps identify public interest patterns over time
6. Which of the following statements about the 'Gartner's Hype Cycle for Emerging Technology' discussed in the course are correct? a. 'Expectations' are shown on the Y-axis b. No technology reaches the 'peak of inflated expectations' c. All technologies fail permanently d. 'Time' is shown on the X-axis | Ans: 'Expectations' are shown on the Y-axis, 'Time' is shown on the X-axis
7. A customer purchases a product or service from a company primarily because... a. an unmet need exists b. the solution can address the need c. competitors are weak d. excess disposable income exists | Ans: an unmet need exists, the solution can address the need
8. According to the lecture on startup failures, which statement is true? a. Lack of market demand is the most common reason for failure b. Marketing issues never cause failure c. Customer feedback is irrelevant d. Funding is always the top reason | Ans: Lack of market demand is the most common reason for failure
9. As per the Need Identification framework, product development should begin by... a. starting with preferred technology b. identifying customer needs first c. focusing only on future ideas d. ignoring customer behaviour | Ans: identifying customer needs first
10. According to Maslow's Hierarchy of Needs, which is the most basic need? a. Esteem needs b. Safety needs c. Physiological needs d. Self-actualization needs | Ans: Physiological needs
11. Based on the Company Needs Hierarchy, which are essential for long-term success? a. Strong sales performance b. Brand credibility c. Office decoration d. Promotional giveaways | Ans: Strong sales performance, Brand credibility
12. While defining a customer problem, which components should be clearly stated? a. Customer profile b. Customer needs c. Jobs to be done d. Expected benefits or losses | Ans: Customer profile, Customer needs, Jobs to be done, Expected benefits or losses
13. Which statements correctly distinguish B2B and B2C models? a. B2C customers include individuals b. B2B customers are fewer c. B2B customers cannot be segmented d. B2C does not require marketing | Ans: B2C customers include individuals, B2B customers are fewer
14. To define a strong Customer Value Proposition, which questions matter? a. What problem is solved? b. What job does the customer want done? c. What benefit is delivered? d. What office furniture is needed? | Ans: What problem is solved?, What job does the customer want done?, What benefit is delivered?
15. Which source is best for accessing farmer query datasets for Al chatbot development? a. Public government data portals b. Political recommendations c. Private consultants only d. Restricted databases | Ans: Public government data portals

[Assignment 6]
1. One of your classmates recently attended a lecture on customer-centric companies. However, he misunderstood some key ideas discussed in class. Identify the CORRECT statement from the options below. a. Amazon focuses on analysing competitors' strategies before thinking about customers b. Amazon builds its business being "customer obsessed" c. Amazon avoids long-term thinking and focuses only on short-term profits d. Amazon believes obsession with customers limits innovation | Ans: Amazon builds its business being "customer obsessed"
2. Please identify the CORRECT statements related to pricing approaches as discussed in this course. a. Value-based pricing depends on how customers perceive the usefulness of a product or service b. Cost-based pricing ignores production and distribution costs c. Premium pricing involves charging lower prices than competitors d. Dynamic pricing allows prices to change based on demand and market conditions | Ans: Value-based pricing depends on how customers perceive the usefulness of a product or service, Dynamic pricing allows prices to change based on demand and market conditions
3. A startup founder is deciding how many features to include in a new product. Increasing features increases cost. What should the founder do based on the course discussion? a. Always minimise features to keep prices as low as possible b. Offer every possible feature regardless of price sensitivity c. Balance customer-perceived benefits with the price customers are willing to pay d. Launch the product without any pricing or benefit analysis | Ans: Balance customer-perceived benefits with the price customers are willing to pay
4. Which of the following statements are CORRECT regarding brand positioning? a. Brand positioning refers to creating a distinct place for a brand in the consumer's mind b. Brand positioning has no relationship with packaging or visual identity c. Brand positioning often uses short phrases or taglines to convey meaning d. Brand positioning avoids emotional connections with customers | Ans: Brand positioning refers to creating a distinct place for a brand in the consumer's mind, Brand positioning often uses short phrases or taglines to convey meaning
5. A friend is exploring artificial intelligence tools for online advertising. Identify his CORRECT assumption. a. Al tools completely replace human involvement in advertising b. Al tools are useful only for people with advanced technical backgrounds c. Al tools can support advertising tasks, but users must learn how to work with them d. Al has no role in digital advertising | Ans: Al tools can support advertising tasks, but users must learn how to work with them
6. Which of the following statements are CORRECT about advertising as a concept? a. Advertising only aims to entertain customers b. Advertising informs, engages, educates, and motivates customers to purchase c. Effective advertisements can influence consumer emotions and choices d. All advertisements are easy to create and require no planning | Ans: Advertising informs, engages, educates, and motivates customers to purchase, Effective advertisements can influence consumer emotions and choices
7. Choose the CORRECT statements related to types of advertisements. a. Telemarketing involves direct communication with potential customers via phone b. Print advertisements are easier to measure than digital advertisements c. TV advertisements offer limited targeting compared to digital platforms d. Using multiple advertising channels always confuses customers | Ans: Telemarketing involves direct communication with potential customers via phone, TV advertisements offer limited targeting compared to digital platforms
8. Which statements are CORRECT about marketing skills? a. Marketing skills are fixed and cannot be learned b. Creative skills are relevant only for designers c. Both hard and soft marketing skills can be developed with systematic learning d. Communication skills require no practice | Ans: Both hard and soft marketing skills can be developed with systematic learning
9. A business owner wants to design a company logo. Identify the CORRECT statements. a. A logo helps differentiate a company's offerings from competitors b. A logo has no role in brand communication c. Logos can be legally protected through registration d. A logo is only meant to look attractive | Ans: A logo helps differentiate a company's offerings from competitors, Logos can be legally protected through registration
10. Which of the following statements are CORRECT about value-based marketing? a. Value can be created through better pricing and value propositions b. Marketing value cannot be created or delivered c. Value delivery includes customer education and convenient distribution d. Value creation is only theoretical and not practical | Ans: Value can be created through better pricing and value propositions, Value delivery includes customer education and convenient distribution
11. Identify the CORRECT elements of effective advertising. a. Advertisements should focus only on creativity b. Advertisements must align with a clear marketing strategy c. Advertisements should be released on suitable media platforms d. Advertisements do not require proper execution | Ans: Advertisements must align with a clear marketing strategy, Advertisements should be released on suitable media platforms
12. Which of the following are CORRECT statements about advertising formats? a. Influencer marketing can help build trust and credibility b. Affiliate marketing is always fraudulent c. Pay-per-click advertising requires regular monitoring of keywords d. E-commerce advertising has no operational challenges | Ans: Influencer marketing can help build trust and credibility, Pay-per-click advertising requires regular monitoring of keywords
13. Please identify the DIFFICULTIES associated with social media marketing. a. Standing out among competitors can be challenging b. Social media trends change rapidly c. Campaign performance can never be measured d. Target audience identification is always easy | Ans: Standing out among competitors can be challenging, Social media trends change rapidly
14. Identify the DIFFICULTIES related to digital content creation. a. Understanding audience preferences is challenging b. Good content guarantees campaign success c. Choosing the wrong platform can reduce campaign effectiveness d. Content visibility cannot affect outcomes | Ans: Understanding audience preferences is challenging, Choosing the wrong platform can reduce campaign effectiveness
15. What is the first step in developing a digital marketing strategy? a. Tracking engagement metrics b. Defining goals and objectives c. Purchasing marketing tools d. Launching advertisements immediately | Ans: Defining goals and objectives

[Assignment 7]
1. Which of the following statements correctly describe retailers? a. Retailers buy products from manufacturers, distributors, or wholesalers b. Retailers sell products in small quantities to final consumers c. Retailers manufacture all products they sell d. Retailers provide convenience, assortment, and service to customers | Ans: Retailers buy products from manufacturers, distributors, or wholesalers, Retailers sell products in small quantities to final consumers, Retailers provide convenience, assortment, and service to customers
2. Choose the CORRECT statement related to the sales process stages. a. Pre-sales focuses on defining customers, problems, and value propositions b. Sales stage only involves repeat orders c. Post-sales does not involve feedback or service d. Re-sales requires no action from the firm | Ans: Pre-sales focuses on defining customers, problems, and value propositions
3. Based on the B2C sales funnel, identify the CORRECT statements. a. Awareness can be built through both online and offline promotions b. Intent is created by clearly communicating unique value propositions c. Purchase assistance improves when products are available across channels d. Advertising has no role in customer awareness | Ans: Awareness can be built through both online and offline promotions, Intent is created by clearly communicating unique value propositions, Purchase assistance improves when products are available across channels
4. Which statement correctly represents the B2B sales funnel? a. Lead generation involves identifying organizations that fit the target profile b. B2B buyers do not require value propositions c. Contracts and terms are unnecessary in B2B sales d. Pricing has no role in negotiation | Ans: Lead generation involves identifying organizations that fit the target profile
5. As explained in this course, what does the term sales channel refer to? a. A digital-only platform used by firms to promote products b. A physical-only distribution route used by manufacturers c. Any online or offline pathway through which products or services reach customers d. Only company-owned brand outlets | Ans: Any online or offline pathway through which products or services reach customers
6. Which of the following can be considered sales channels based on the course discussion? a. Grocery and Kirana outlets b. Large-format retail stores such as supermarkets c. Exclusive brand-owned retail outlets d. Online commerce platforms and marketplaces | Ans: Grocery and Kirana outlets, Large-format retail stores such as supermarkets, Exclusive brand-owned retail outlets, Online commerce platforms and marketplaces
7. Select the correct flow of inventory movement in a typical physical distribution system. a. Factory warehouse → Distributor → End customer→ Redistribution warehouse → Retailer b. Factory warehouse → Redistribution warehouse → Distributor → Retail outlet → Final consumers c. Factory warehouse → Retailer → Distributor Consumers d. Factory warehouse → Consumers → Retailer → Distributor | Ans: Factory warehouse → Redistribution warehouse → Distributor → Retail outlet → Final consumers
8. When we refer to an Omni-channel approach, what exactly does it imply? a. Operating only through physical retail formats b. Selling exclusively through digital platforms c. Integrating physical stores, digital platforms, and social channels into one seamless experience d. Focusing only on premium retail locations | Ans: Integrating physical stores, digital platforms, and social channels into one seamless experience
9. Which statements about distributors are CORRECT as per the course? a. Distributors usually purchase products in large volumes from manufacturers b. Distributors help manufacturers reach retailers efficiently c. Distributors eliminate the need for retailers d. Distributors enable retailers to buy goods in smaller quantities | Ans: Distributors usually purchase products in large volumes from manufacturers, Distributors help manufacturers reach retailers efficiently, Distributors enable retailers to buy goods in smaller quantities
10. A firm plans to deploy a Distributor Management System (DMS). Which components should such a system ideally support? a. Sales planning and distributor target setting b. Retail outlet coverage and beat planning c. Order capture, tracking, and fulfilment d. Employee payroll processing and statutory compliance | Ans: Sales planning and distributor target setting, Retail outlet coverage and beat planning, Order capture, tracking, and fulfilment
11. Which statement best explains the concept of win-win negotiation? a. One party gains while the other loses b. Both parties reach outcomes that benefit them c. Only the buyer benefits d. Winning is psychological rather than real | Ans: Both parties reach outcomes that benefit them
12. A team is debating sales automation. Identify the Correct arguments. a. Automation reduces sales-force productivity b. Automation negatively impacts revenue c. Automation improves customer engagement d. Automation enables faster customer response | Ans: Automation improves customer engagement, Automation enables faster customer response
13. Which views on using artificial intelligence in sales are CORRECT? a. Al can assist in identifying target customers b. Al can support email management and pitch creation c. Al cannot help in sales forecasting d. Al has no role in customer analysis | Ans: Al can assist in identifying target customers, Al can support email management and pitch creation
14. Which of the following are useful sources for generating B2B people leads? a. Professional networking platforms such as LinkedIn b. Government and corporate registration databases c. Industry conferences and seminars d. Trade fairs and exhibitions | Ans: Professional networking platforms such as Linkedin, Government and corporate registration databases, Industry conferences and seminars, Trade fairs and exhibitions
15. Four sales executives pitch an ERP solution. Who has delivered the most effective sales presentation? a. Sales Executive 1 discusses only the customer's problem b. Sales Executive 2 discusses only the product features c. Sales Executive 3 discusses only pricing advantages d. Sales Executive 4 discusses a solution that links customer problems, solutions, benefits, and cost comparison | Ans: Sales Executive 4 discusses a solution that links customer problems, solutions, benefits, and cost comparison

[Assignment 8]
1. Which statement correctly defines a supply chain according to this course? a. A system involving only transportation activities b. A network consisting only of manufacturing units c. A network of people, processes, infrastructure, transport, and technology involved in product flow d. A system limited to warehouses | Ans: A network of people, processes, infrastructure, transport, and technology involved in product flow
2. While discussing customer loyalty, which of the following statements are CORRECT as per the course? a. Offering strong value propositions at reasonable prices helps build loyalty b. Loyalty increases when products are priced beyond customer affordability c. Long-term engagement programs encourage repeat purchases d. Good customer service leads to customer disloyalty | Ans: Offering strong value propositions at reasonable prices helps build loyalty, Long-term engagement programs encourage repeat purchases
3. Which of the following entities are part of supply chain components? a. Warehouses and storage facilities b. Distributors and stockists c. Retail delivery systems d. Internal office cafeterias | Ans: Warehouses and storage facilities, Distributors and stockists, Retail delivery systems
4. Based on discussions in this course, which statement best explains the concept of customer service? a. Customer service includes support provided only after the purchase is completed b. Customer service refers to promotional communication before purchase c. Customer service covers support activities both before and after customers buy and use a product or service d. Customer service is limited to handling complaints | Ans: Customer service covers support activities both before and after customers buy and use a product or service
5. In supply chain terminology, what is a pallet? a. A fuel source used in warehouses b. A standardized platform used for handling and transporting goods c. A packaging label d. A warehouse software module | Ans: A standardized platform used for handling and transporting goods
6. You are evaluating the quality performance of a customer support centre. Which of the following are appropriate quality KPIs? a. Average response time b. Issue resolution time c. Customer satisfaction ratings d. Number of office assets | Ans: Average response time, Issue resolution time, Customer satisfaction ratings
7. Which of the following activities contribute to delivery lead time? a. Processing customer orders b. Dispatch and outbound logistics c. Hiring new employees d. Raising investment capital | Ans: Processing customer orders, Dispatch and outbound logistics
8. Complete the sentence based on course learning: If an individual demonstrates strong customer service skills, then... a. they understand the company's products and services well b. they communicate clearly and persuasively with customers c. they avoid listening to customer concerns d. they discourage customer interaction | Ans: they understand the company's products and services well, they communicate clearly and persuasively with customers
9. While estimating the cost of customer service operations, which of the following are valid cost KPIs? a. Cost incurred per customer interaction b. Office wall paint colours c. Infrastructure and technology expenses d. Customer appreciation emails | Ans: Cost incurred per customer interaction, Infrastructure and technology expenses
10. Match the supply chain type with its correct attributes as discussed in the course. a. On-demand supply chain - High lead time and unpredictable demand b. Express supply chain - Low lead time and unpredictable demand c. Flow supply chain - Unpredictable demand and high lead time d. Lean supply chain - High lead time and unpredictable demand | Ans: On-demand supply chain - High lead time and unpredictable demand, Express supply chain - Low lead time and unpredictable demand
11. You are designing a customer loyalty measurement framework for an organization. Which metrics should be included? a. Customer satisfaction indicators b. Revenue contribution and profitability c. Share of wallet and market penetration d. Brand logo design | Ans: Customer satisfaction indicators, Revenue contribution and profitability, Share of wallet and market penetration
12. Which of the following are key elements of effective customer service systems discussed in the course? a. Structured service quality management processes b. Clear mechanisms for complaint handling and resolution c. Absence of escalation procedures d. Ignoring contractual and compliance requirements | Ans: Structured service quality management processes, Clear mechanisms for complaint handling and resolution
13. Which statements correctly describe supply chain planning activities? a. Demand forecasting is a critical planning input b. Production planning plays no role in supply chain decisions c. Warehouse and transport planning are important planning components d. Raw material planning is irrelevant | Ans: Demand forecasting is a critical planning input, Warehouse and transport planning are important planning components
14. For a company manufacturing and selling soft drinks, which actions help optimize the supply chain? a. Transport route optimization b. Product and packaging optimization c. Ignoring warehouse utilization d. Eliminating workforce planning | Ans: Transport route optimization, Product and packaging optimization
15. While designing a training program on basic supply chain skills for employees, which topics should be included? a. Demand forecasting fundamentals b. Warehouse management practices c. Office interior aesthetics d. Advanced abstract mathematics | Ans: Demand forecasting fundamentals, Warehouse management practices

[Assignment 9]
1. Which of the following is correct about 'Business Risk', as discussed in the course? a. A business risk is the potential for a company to experience losses or fail to meet its objectives due to a variety of internal and external factors. b. These risks NEVER arise from uncertainties in the market. c. These risks NEVER arise from shifting consumer preferences. d. There are MANY businesses which NEVER face any kind of risk. | Ans: A business risk is the potential for a company to experience losses or fail to meet its objectives due to a variety of internal and external factors.
2. As discussed in the course, for a company, 'Price wars with competitors forcing reduced profit margins' is an example of a. Regulatory risk b. Market risk C. Economic risk d. Human risk | Ans: Market risk
3. Suppose new government environmental regulations require companies to modify production processes and invest in compliance technologies. This is an example of: a. Market risk b. Economic risk c. Regulatory risk d. Human risk | Ans: Regulatory risk
4. When global economic conditions deteriorate and overall demand for goods and services declines, businesses face: a. Human risk b. Economic risk c. Operational risk d. Regulatory risk | Ans: Economic risk
5. Risks that originate from internal processes, system failures, or human errors that disrupt daily operations are classified as: a. Market risks b. Strategic risks c. Operational risks d. Regulatory risks | Ans: Operational risks
6. Which of the following is correct about 'risk matrix' for a company, as discussed in the course? a. It eliminates uncertainties completely from organizational activities. b. It is a purely theoretical framework with no real-world business application. c. It focuses only on financial risks and ignores other business risks. d. It is a structured tool used to evaluate and prioritize risks based on likelihood and potential impact. | Ans: It is a structured tool used to evaluate and prioritize risks based on likelihood and potential impact.
7. Which of the following is an example of an 'external risk' as discussed in the course? a. Operational risk b. Human resources risk c. Office risk d. Regulatory risk | Ans: Regulatory risk
8. Which of the following defines 'business information', as discussed in the course? a. Business information is all the unsubstantiated information about a company circulating on the internet. b. Business information refers to the wide array of data, insights, and knowledge that a company actively gathers, organizes, and utilizes. C. Business information refers to the wide array of data, insights, and knowledge that a company actively gathers, organizes, but NEVER utilizes. d. Business information refers to the wide array of data that a company actively gathers, but NEVER organizes or utilizes. | Ans: Business information refers to the wide array of data, insights, and knowledge that a company actively gathers, organizes, and utilizes.
9. Which of the following statements regarding the use of 'Business information' is CORRECT, according to discussions in the course? a. It is used for driving superior performance internally and externally in a company. b. It is NEVER useful for driving superior performance internally and externally in a company. It is just good information. c. 'Business information' has no connection with information technology. d. 'Business information' has no relation with planning and decision making in a company. | Ans: It is used for driving superior performance internally and externally in a company.
10. What is MIS, as discussed in the course? a. MIS refers to Malignant Information System. b. MIS refers to Management Information System. c. MIS refers to Master in Investment Shorts. d. MIS refers to Multi-million Investment System. | Ans: MIS refers to Management Information System.
11. Which of the following correctly describes ERP software, as discussed in the course? a. Enterprise Resource Planning (ERP) software is an integrated software platform which is NEVER used to manage and automate a wide range of business processes across an entire organization. b. Enterprise Resource Planning (ERP) software is an integrated software platform which is used to manage and automate a wide range of business processes across an entire organization. c. Enterprise Resource Planning (ERP) software is an integrated software platform which is used to manage but NEVER automate a wide range of business processes across an entire organization. d. Enterprise Resource Planning (ERP) software is an integrated software platform which never integrates with any other software in a company. | Ans: Enterprise Resource Planning (ERP) software is an integrated software platform which is used to manage and automate a wide range of business processes across an entire organization.
12. Which of the following statements are correct about 'ERP Modules' as discussed in the course? a. 'Financial management' can be an ERP Module. b. 'Procurement' can be an ERP Module. c. 'Risk management' can be an ERP Module. d. 'Project management' can be an ERP Module. | Ans: 'Financial management' can be an ERP Module., 'Procurement' can be an ERP Module., 'Risk management' can be an ERP Module., 'Project management' can be an ERP Module.
13. Please complete the following sentence with your learning from the course. If you are using an 'ERP system' in a company, you can... a. see any report you would like to, no matter what level or role you have in the company. b. see any report you would like to, no matter what is your function and responsibility in the company. c. never see any report unless you are a CEO or CFO of the company. d. see reports based on your level, role, function and responsibility in the company. | Ans: see reports based on your level, role, function and responsibility in the company.
14. Please pick the correct statement from the following options, based on your learning from the course. a. If you are the CEO of a company, you should read only the 'IT Helpdesk' reports and nothing else. b. If you are the CEO of a company, you should read only the 'Procurement Cost Analysis' report and nothing else. c. If you are the CEO of a company, you should read the 'Financial Performance' reports and other important reports. d. If you are the CEO of a company, you should NEVER read any report and work ONLY as you wish to according to your personal logic. | Ans: If you are the CEO of a company, you should read the 'Financial Performance' reports and other important reports.
15. Please pick the correct statement about 'External Company Information', based on your learning from the course. a. An annual report of a company details a company's financial performance, business activities, strategy and future outlook for a fiscal year. b. The official website of a company is the NON-OFFICIAL online platform where the company shares information about its products, services, leadership, corporate missions etc. c. No company should ever have social media handles which are their public profiles on platforms like LinkedIn, Twitter, Facebook etc. as they always invite controversies. d. No company should ever release its 'Corporate Social Responsibility' reports to the public. It can be dangerous for the future of the company. | Ans: An annual report of a company details a company's financial performance, business activities, strategy and future outlook for a fiscal year.

[Assignment 10]
1. What is 'Commodity Business', as discussed in the course? a. Commodity business stands for business that deals with raw materials or primary products that are largely differentiated and NEVER sold based on price. b. Commodity business stands for business that deals with raw materials or primary products that are largely undifferentiated and sold based on price. c. Commodity business stands for business that deals with finished products ONLY that are largely differentiated and sold based on how they look. d. Commodity business stands for business that NEVER deals with raw materials or primary products that are largely undifferentiated and sold based on price. | Ans: Commodity business stands for business that deals with raw materials or primary products that are largely undifferentiated and sold based on price.
2. What is 'Manufacturing Business', as discussed in the course? a. Manufacturing Business is a business that produces physical products using raw materials, labor, and equipment, which are then sold to consumers or other businesses. b. Manufacturing Business is a business that produces physical products using raw materials but NO labor or equipment. c. Manufacturing Business is a business that produces physical products using raw materials, labor, and equipment, which are NEVER sold to anyone. d. Manufacturing Business is a business that produces NO physical products using raw materials, labor, and equipment. | Ans: Manufacturing Business is a business that produces physical products using raw materials, labor, and equipment, which are then sold to consumers or other businesses.
3. Which of the following are commonly recognized as aggregator-based business platforms? a. Tata Motors is an aggregator business as it makes cars. b. Swiggy is an aggregator business. c. Uber is an aggregator business. d. Airbnb is NOT an aggregator business as it deals in airplanes. | Ans: Swiggy is an aggregator business., Uber is an aggregator business.
4. Which of the following best describes a 'Business Model' as discussed in the course? a. A decorative model used only in business exhibitions ONLY. b. A business model is a comprehensive framework that outlines how a company creates, delivers, and captures value in a systematic and sustainable way. c. A business model is a comprehensive framework that outlines how a company creates, and delivers value in a systematic and sustainable way. It NEVER talks about how value is captured by the business. d. A business model is a comprehensive framework that outlines how a company ONLY creates, and captures value in a systematic and sustainable way. It never talks about how value is delivered by the business. | Ans: A business model is a comprehensive framework that outlines how a company creates, delivers, and captures value in a systematic and sustainable way.
5. Which of the following statements about a 'Trading Business' is correct as discussed in the course? a. Trading business operates without purchasing or selling products. b. Trading business cannot generate employment opportunities. c. A trading business can never be profitable for anyone. d. Trading business is a business that buys and sells products (often not manufactured by the company itself) for profit to other businesses or consumers, acting as an intermediary. | Ans: Trading business is a business that buys and sells products (often not manufactured by the company itself) for profit to other businesses or consumers, acting as an intermediary.
6. Which of the following statements about 'not-for-profit businesses' are CORRECT? a. A business which is established to address social, educational, or charitable objectives. b. Not-for-profit business is a theoretical concept only. Such a business can never be created in real life. c. They may operate with donations, grants, or fundraising activities. d. Their primary objective is to maximize shareholder profits. | Ans: A business which is established to address social, educational, or charitable objectives., They may operate with donations, grants, or fundraising activities.
7. Choose the CORRECT 'pricing drivers' from the options given below, as discussed in the course. a. Business Strategy b. Cost of Production c. Customer Perception of Value d. Affordability | Ans: Business Strategy, Cost of Production, Customer Perception of Value, Affordability
8. Which of the following defines 'social business' as discussed in the course? a. A social business is a 'social mission' driven enterprise designed to address a social or environmental issue in a financially sustainable manner. b. No one can create a 'social' business. It is a theoretical concept only. c. A social business is a 'social mission' driven enterprise designed to address a social or environmental issue in a financially UNSUSTAINABLE manner. d. A social business can NEVER be designed. No one can explain how they come into existence. | Ans: A social business is a 'social mission' driven enterprise designed to address a social or environmental issue in a financially sustainable manner.
9. Choose the CORRECT statements about different types of business as discussed in the course. a. The primary objective of a 'for-profit' business is to solve social and environmental issues sustainably without generating ANY revenue. b. The primary objective of a 'non-profit' organization is to address a social or environmental issue. c. 'For-profit' business generates revenue through the sale of products/services for profit. d. A 'non-profit' organization relies on donations, grants and fundraising activities. | Ans: The primary objective of a 'non-profit' organization is to address a social or environmental issue., 'For-profit' business generates revenue through the sale of products/services for profit., A 'non-profit' organization relies on donations, grants and fundraising activities.
10. Choose the CORRECT statement about UN Sustainable Development Goals, as discussed in the course. a. The 2030 Agenda for Sustainable Development, adopted by all United Nations members in 2015, created 17 Sustainable Development Goals (SDGs). b. The SDGs DO NOT highlight the connections between the environmental, social and economic aspects of sustainable development. c. SDGs are NOT related to sustainability. d. The aim of these global goals is to ONLY help a few business owners make profit at any cost. | Ans: The 2030 Agenda for Sustainable Development, adopted by all United Nations members in 2015, created 17 Sustainable Development Goals (SDGs).
11. Please pick the 'NGOs in India' from the list below, as per discussions in the course. a. Goonj Limited b. Cry c. Sargam Sanstha d. Lepra Society | Ans: Goonj Limited, Cry, Sargam Sanstha, Lepra Society
12. Choose the correct statement from the following options, about 'Trusts' in the context of Social Business Development, as discussed in the course. a. No such term exists in the context of Social Business Development. b. A trust can ONLY be a public trust (serving the public). It can NEVER be a private trust (serving specific individuals). c. Trusts are often set up for ONLY educational purposes, such as establishing schools. Hospitals CANNOT be established using 'Trusts' mode. d. A Trust is a legal entity created when a person (called the settlor or trustor) transfers property or assets to a trustee for the benefit of specific individuals or the public at large. | Ans: A Trust is a legal entity created when a person (called the settlor or trustor) transfers property or assets to a trustee for the benefit of specific individuals or the public at large.
13. Which of the following statements about 'Section 8 Companies' under the Companies Act, 2013 is CORRECT as discussed in the course. a. No such term exists in the Companies Act 2013. b. Section 8 Companies are created ONLY for creating companies that generate profits ONLY without caring for objectives like environment protection etc. c. A Section 8 Company (formerly known as a Section 25 Company under the Companies Act, 1956) is a company formed with the objective of promoting commerce, art, science, sports, education, research, social welfare, religion, charity, or environmental protection. d. 'Section 8 companies' is a list of eight worst performing companies in a given financial year published by Ministry of Corporate Affairs every year since 2013. | Ans: A Section 8 Company (formerly known as a Section 25 Company under the Companies Act, 1956) is a company formed with the objective of promoting commerce, art, science, sports, education, research, social welfare, religion, charity, or environmental protection.
14. Which of the following statements about the structure of 'Trusts', 'Societies' and 'Section 8 Companies' is CORRECT as discussed in the course. a. The minimum number of members in 'Societies' is not defined. b. A Section 8 company needs a minimum of 2 directors. c. There can be only ONE trustee in a 'Trust'. d. There is no need for directors or members in a 'Section 8 Company'. | Ans: A Section 8 company needs a minimum of 2 directors.
15. Which of the following correctly describes 'Corporate Social Responsibility' as discussed in the course. a. Corporate Social Responsibility (CSR) means the voluntary contributions made by companies to a better society and a cleaner environment. b. According to Section 135 of the Companies Act, 2013 ("Act") certain companies may contribute a certain amount towards CSR activities ONLY if they would like to. c. Corporate Social Responsibility (CSR) means the forced (non-voluntary) contributions made by companies to a better society and a cleaner environment. d. No voluntary contributions under Corporate Social Responsibility can be made for improving the environment. | Ans: Corporate Social Responsibility (CSR) means the voluntary contributions made by companies to a better society and a cleaner environment.

[Assignment 11]
1. Given below are a few 'startup characteristics'. Please pick the correct pairs from the following options, based on your learning in the course. a. Innovation: Focus on novel products, services to non-existent problems that will NEVER have any impact on any business. b. Scalability: Potential to sell a fixed, small number of products at all times. c. Risk and Uncertainty: Operate with high levels of risk, as they often explore unproven markets. d. Lean Structure: Quick-&-Fast approach, frequently using methodologies like Lean Startup and Agile Development. | Ans: Risk and Uncertainty: Operate with high levels of risk, as they often explore unproven markets., Lean Structure: Quick-&-Fast approach, frequently using methodologies like Lean Startup and Agile Development.
2. Which of the following defines 'startup', as discussed in the course? a. A startup is a late stage company, which is about to shut down due to constant failure. b. A startup is an early stage, innovative company designed to develop and validate a scalable business model in response to a market need. c. A startup is an early stage, non-innovative company that can NEVER be scaled. d. A startup is an early stage, non-innovative company that ONLY creates innovations that have NO market need. | Ans: A startup is an early stage, innovative company designed to develop and validate a scalable business model in response to a market need.
3. Which of the following statements about 'MSMEs' in India is correct as discussed in the course? a. Over six crores exist; less than 10% are urban. b. Over six crores exist; less than 10% are rural. c. Over six crores exist; roughly half of them are urban, and half of them are rural. d. Only six lakhs exist. | Ans: Over six crores exist; roughly half of them are urban, and half of them are rural.
4. Given below are statements comparing 'Tech Startups' and 'MSMEs'. Please pick the correct statements based on your learning in the course. a. Tech startups are high, exponential growth focused and MSMEs are steady, incremental growth focused. b. Tech startups focus on innovation, often creating new products, services, or business models and MSMEs operate with traditional business models. c. Tech startups always take lower risk and have a more conservative approach to business and MSMEs always prefer to engage in high-risk, high reward markets. d. There is absolutely NO DIFFERENCE between 'Tech Startups' and 'MSMES'. | Ans: Tech startups are high, exponential growth focused and MSMEs are steady, incremental growth focused., Tech startups focus on innovation, often creating new products, services, or business models and MSMEs operate with traditional business models.
5. Given below are statements about four companies called A, B, C and D who are applying to you for a grant as a 'startup'. Please pick the company which qualifies to be called a 'startup' based ONLY on the facts mentioned in the choices below. a. Company A: This company is in existence for 12 years and has an annual turnover of Rs. 200 crore. b. Company B: This company is in existence for 7 years and has an annual turnover of Rs. 110 Crore. It has been formed by splitting up an existing business. c. Company C: This company is in existence for 2 years and has a steady annual turnover between Rs. 1 crore and Rs. 2 Crore since its incorporation. It is incorporated as a Private Limited Company. d. Company D: This company is in existence for 15 years and has an annual turnover of Rs. 30 lakh since its inception. It is a 'One Person Company'. | Ans: Company C: This company is in existence for 2 years and has a steady annual turnover between Rs. 1 crore and Rs. 2 Crore since its incorporation. It is incorporated as a Private Limited Company.
6. Please pick the correct statements from the options given below related to 'Design Thinking' based on your learning in the course. a. 'Design Thinking' is useful only for designing. It has NO USE in starting up a new tech venture. b. 'Design Thinking' can help someone 'ideate' ONLY. It CANNOT help in creating 'prototypes' for new product ideas. c. 'Design Thinking' can help product designers 'empathize' with potential customers during new product development. d. 'Design Thinking' can help in 'exploration' and 'experimentation' needed for developing new products. | Ans: 'Design Thinking' can help product designers 'empathize' with potential customers during new product development., 'Design Thinking' can help in 'exploration' and 'experimentation' needed for developing new products.
7. Which of the following defines 'Social Business', as discussed in the course? a. A social business is always a non-profit business that relies solely on donations, unable to generate its own revenue to support operations. b. A social business is a business that consistently operates at a loss, regardless of its goals or activities. c. A social business focuses primarily on generating profit for its shareholders, with no consideration for its social or environmental impact. d. A social business is an enterprise driven by a social or environmental mission, aiming to solve societal issues while maintaining financial sustainability. | Ans: A social business is an enterprise driven by a social or environmental mission, aiming to solve societal issues while maintaining financial sustainability.
8. Given below are a few statements about the 'Business Model Canvas'. Please pick the correct choices based on your learning in the course. a. There is no term called 'Business Model Canvas' in business. b. The 'Business Model Canvas' gives a high-level view of a business giving important details about it like its value proposition, key activities, cost structures etc. c. The different boxes or components of a 'Business Model Canvas' are quite standard and help to plan & present to various stakeholders in a startup. d. The differences of a 'Business Model Canvas' are not standard and can vary widely. | Ans: The 'Business Model Canvas' gives a high-level view of a business giving important details about it like its value proposition, key activities, cost structures etc., The different boxes or components of a 'Business Model Canvas' are quite standard and help to plan & present to various stakeholders in a startup.
9. Given below are a few statements about what you would do if you are exploring a 'Social Business Opportunity'. Please pick the correct statement based on your learning in the course. a. You should NEVER invest any time to identify a good social or economic issue for this. Pick anything you like and it will somehow work out. b. You should NEVER invest any time in analysing existing 'market gaps' as a social business has no need for profit. c. You should invest time to carefully analyse the future scalability and scope of the social business opportunity. d. You should NEVER invest time in exploring or building a 'competitive edge' for this business as competition is a bad thing. | Ans: You should invest time to carefully analyse the future scalability and scope of the social business opportunity.
10. Given below are a few statements on what you would do if you are creating a plan for a 'Social Business'. Please pick the correct statements based on your learning in the course. a. You will analyse the 'Social Business Opportunity'. b. You will NOT study the 'Customer Profile' as it is never important in a Social Business. c. You will try to understand and calculate the 'Beneficiary Impact'. d. You will try to understand and calculate the 'Stakeholder Impact'. | Ans: You will analyse the 'Social Business Opportunity'., You will try to understand and calculate the 'Beneficiary Impact'., You will try to understand and calculate the 'Stakeholder Impact'.
11. Please pick the correct statement about the 'One District, One Product' scheme launched by the government of India, based on your learning in the course. a. This scheme is aimed at promoting unbalanced regional development in India. b. This scheme aims to reduce the supply of all products to a given district in India to only one product, which is chosen randomly. c. This scheme aims to immediately stop the production of different types of products in a given district of India and force the production of only one type of product, which is chosen randomly. d. This scheme is aimed at promoting all-round socio-economic growth across all regions of India. | Ans: This scheme is aimed at promoting all-round socio-economic growth across all regions of India.
12. The full form of TRIFED, as discussed in the course is... a. Tribal Co-Operative Marketing Development Federation of India b. Tribal Food Development c. Tribal Food Education d. Tribal Food Education and Destinations | Ans: Tribal Co-Operative Marketing Development Federation of India
13. You are a consultant assessing the overall impact of a 'Social Business' on its beneficiaries and ecosystem. Which of the following would you consider in your evaluation from the options given below? a. Community Impact b. Environmental Responsibility c. Improved Livelihoods d. Better quality of life across health, education, and living standards | Ans: Community Impact, Environmental Responsibility, Improved Livelihoods, Better quality of life across health, education, and living standards
14. Given below are statements about 'feminine hygiene'. Please pick the CORRECT option, based on your learning in the course. a. Sanitary products have to be made accessible but NOT affordable for low-income women, to improve the 'feminine hygiene' of their community. b. Sanitary products have to be made affordable but NOT accessible for low-income women, to improve the 'feminine hygiene' of their community. c. Sanitary products have to be made accessible and affordable for low-income women to improve the 'feminine hygiene' of their community. d. There is absolutely NO relation between sanitary products and feminine hygiene. | Ans: Sanitary products have to be made accessible and affordable for low-income women to improve the 'feminine hygiene' of their community.
15. What is the 'School-in-a-Box' model as discussed in the course? a. It is a World Bank scheme to provide ONLY free tiffin boxes to poor school children in under-developed countries. b. It is a model to provide affordable, quality basic education through chain schools. c. It is a model to provide advanced technical degrees to very rich communities. d. It is a model to discourage young students from going to school. | Ans: It is a model to provide affordable, quality basic education through chain schools.

[Assignment 12]
1. Given below are the statements related to the uses of a 'Business Plan'. Which of the following statements are correct based on your learning in the course? a. A business plan can be used for internal discussion like 'Board Review'. b. A business plan can be used for internal events like 'Industry Seminars'. c. A business plan can be used for external discussion like 'Startup Pitching'. d. A business plan can be used for external events like 'Employee Performance Review'. | Ans: A business plan can be used for internal discussion like 'Board Review'., A business plan can be used for external discussion like 'Startup Pitching'.
2. What is a 'Business Plan', as discussed in the course? a. A business plan is a formal document that outlines the goals, strategies, and roadmap of a business. b. A business plan is any document related to any business. c. A business plan is a formal document that outlines the strategies and roadmap of a business. It never talks about goals. d. A business plan is just an idea. It is never documented anywhere. | Ans: A business plan is a formal document that outlines the goals, strategies, and roadmap of a business.
3. Which of the following statements are related to elements of a 'Business Plan' based on your learning in the course. a. Executive Summary is NOT an element of a Business Plan. b. Operational Plan is an element of a Business Plan. c. Organizational Plan is an element of a Business Plan. d. ESG & CSR update is NOT an element of a Business Plan. | Ans: Operational Plan is an element of a Business Plan., Organizational Plan is an element of a Business Plan.
4. What are the '3C' of Business Communication, as discussed in the course? a. Control, Command, Compliance b. Campaign, Channel, Conversion c. Correctness, Conciseness, Clarity d. Cold Calling Chain | Ans: Correctness, Conciseness, Clarity
5. The full form of 'BHEL' Company, as discussed in the course is... a. Bharat High Efficiency Logistics b. Bharat Hydro Energy Lines c. Bharat Heavy Equipment Leasing d. Bharat Heavy Electricals Limited | Ans: Bharat Heavy Electricals Limited
6. You are creating the title slide of a 'Business Plan'. Given below are some statements on what you should or should not do while creating a title slide for a business plan. Please pick the correct statement based on your learning in the course. a. It should NEVER have the name of your business. It is ALWAYS a good idea to create such suspense and never reveal it. b. It may have a tagline, which makes it easy for people reading the business plan to understand what you are going to present. c. It should NEVER give the details of the team, particularly the person who created it. d. It should NEVER have any date anywhere as having dates and timelines is always a bad idea in any business. | Ans: It may have a tagline, which makes it easy for people reading the business plan to understand what you are going to present.
7. Your friend is trying to write a 'Business Plan'. Given below are some statements, which are advices you can give to your friend. Please select the correct advice from the choices below, as per the discussions in the course. a. Writing a business plan is not important as no great businessman in the world ever wrote a business plan before starting a business. b. Writing a business is impossibly difficult and only someone who is extremely intelligent can do it. So no one should try to write a business plan. c. Writing a business plan is easy, as nowadays there are standard formats for it and you can get better at it by practicing. d. Writing a business plan is impossibly difficult, as there is NO basic format for writing a business plan that is available on the internet. | Ans: Writing a business plan is easy, as nowadays there are standard formats for it and you can get better at it by practicing.
8. You are writing the Executive Summary of a Business Plan. Given below are some points you should include in the 'Key Financials' section. Please select the correct ones, based on your learning in the course. a. Initial Investment b. Projected Year 1 Revenue c. Break-even Point d. Details of bespoke dining experience | Ans: Initial Investment, Projected Year 1 Revenue, Break-even Point
9. If you are writing about the 'Target Market' in your 'Business Plan', which of the following items will you include in this section, as per discussions in the course. a. Target market b. Market need c. PAN card details of every potential customer d. Phone numbers of every potential customer | Ans: Target market, Market need
10. You are designing the 'Unique Selling Proposition (USP)' for a luxury lounge. Given below are a few ideas on how to do it. Please select the correct ideas, as per discussions in the course. a. Exclusive membership b. High level security & privacy c. Copying the ideas of the worst lounges that you can think of. d. There can be NO USP for a luxury lounge. | Ans: Exclusive membership, High level security & privacy
11. You are designing the 'Product & Service Offerings' for a luxury hotel for very rich customers. Given below are a few ideas on how to do this. Please select the correct option based on your learning in the course. a. Create tailored culinary experience b. Do NOT have any exclusive beverages c. Do NOT have any entertainment facility d. Never use ANY speciality ingredients | Ans: Create tailored culinary experience
12. You are selecting the 'location & ambience' for a luxury tea-shop that you want to open in the next six months. Given below are some factors you should consider while doing this. Please pick the correct factors based on your learning in the course. a. Prime location b. High end decor c. It should be near a market where there is a lot of noise. This will help the customers appreciate the ambience of the luxury tea-shop better. d. It should be near a busy market where parking a car is very difficult. This will help the tea-shop earn more from the parking fees. | Ans: Prime location, High end decor
13. You have recently launched a luxury restaurant. You are trying to create a Membership Retention Program for this restaurant. Given below are some ideas for this. Please choose the most relevant ideas, based on your learning in the course. a. Organising regular food tasting events b. Organising special seasonal menu releases c. Doing exclusive collaborations with luxury brands d. Calling your customers at least ten times every day to sign up for the Membership Retention Program. | Ans: Organising regular food tasting events, Organising special seasonal menu releases, Doing exclusive collaborations with luxury brands
14. You have recently launched a video-game parlour, where children can come and play video games by paying Rs. 100 per hour. You are trying to create 'financial projections' for this project. Which of the following options will you choose for this, based on your learning in the course? a. Projected Revenue (Year 1) b. Profit Margin c. Cost of your favourite vegetable in the market d. Break-even point | Ans: Projected Revenue (Year 1), Profit Margin, Break-even point
15. You are creating the 'Operational Plan' for a manufacturing company that manufactures high-quality laptops. Which of the following points will you include in this plan, based on your learning in the course? a. Staffing b. What will the company do after 2000 years? c. Supplier partnerships d. Daily Production | Ans: Staffing, Supplier partnerships, Daily Production
`;

// --- 3. CORE LOGIC ---
function parseData(rawData) {
    const blocks = rawData.split(/\[Assignment\s+(\d+)\]/i);
    let allParsed = [];
    for (let i = 1; i < blocks.length; i += 2) {
        const weekNum = parseInt(blocks[i]);
        const weekText = blocks[i+1];
        const lines = weekText.split('\n').filter(line => /^\d+\./.test(line.trim()));
        
        const parsedLines = lines.map((line, index) => {
            const [qPart, ansPart] = line.split(' | Ans: ');
            const parts = qPart.split(/(?:\s+|^)[a-e]\.\s+/i);
            const questionText = parts[0].substring(parts[0].indexOf('.') + 1).trim();
            const options = [];
            for (let j = 1; j < parts.length; j++) {
                const optText = parts[j].trim();
                if (optText) options.push(optText);
            }
            const safeAnsPart = (ansPart || "").toLowerCase().replace(/\s+/g, ' ');
            const correctAnswers = options.filter(opt => {
                const safeOpt = opt.toLowerCase().replace(/\s+/g, ' ');
                return safeAnsPart.includes(safeOpt);
            });
            return {
                id: `w${weekNum}_q${index + 1}`,
                week: weekNum,
                question: questionText,
                options: options,
                correctAnswers: correctAnswers,
                type: correctAnswers.length > 1 ? 'multiple' : 'single'
            };
        });
        allParsed = allParsed.concat(parsedLines);
    }
    return allParsed;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let questions = [];
let currentIndex = 0;
let userAnswers = {};
let reviewMode = false;
let currentFilter = 'all';

const qNumberEl = document.getElementById('q-number');
const qTypeEl = document.getElementById('q-type');
const qTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const clearBtn = document.getElementById('clear-btn');
const navGrid = document.getElementById('nav-grid');
const submitBtn = document.getElementById('submit-btn');
const attemptedCountEl = document.getElementById('attempted-count');
const totalCountEl = document.getElementById('total-count');
const resultModal = document.getElementById('result-modal');
const resetModal = document.getElementById('reset-modal');
const weekFilter = document.getElementById('week-filter');

function initQuiz() {
    const isSubmitted = localStorage.getItem('bfe_quiz_submitted');
    if (isSubmitted) {
        localStorage.removeItem('bfe_quiz_state');
        localStorage.removeItem('bfe_quiz_submitted');
    }
    currentFilter = localStorage.getItem('bfe_quiz_filter') || 'all';
    weekFilter.value = currentFilter;

    const savedState = JSON.parse(localStorage.getItem('bfe_quiz_state'));
    if (savedState && savedState.questions) {
        questions = savedState.questions;
        userAnswers = savedState.userAnswers || {};
    } else {
        const parsedQuestions = parseData(rawDataString);
        let filteredQuestions = parsedQuestions;
        if (currentFilter !== 'all') {
            const selectedWeek = parseInt(currentFilter);
            filteredQuestions = parsedQuestions.filter(q => q.week === selectedWeek);
        }
        questions = shuffleArray(filteredQuestions);
        questions.forEach(q => q.options = shuffleArray(q.options));
        saveState();
    }
    totalCountEl.textContent = questions.length;
    renderNavGrid();
    loadQuestion(0);
}

function saveState() {
    if(!reviewMode) {
        localStorage.setItem('bfe_quiz_state', JSON.stringify({ questions, userAnswers }));
    }
}

function updateProgress() {
    const attempted = Object.keys(userAnswers).filter(k => userAnswers[k].length > 0).length;
    attemptedCountEl.textContent = attempted;
    document.querySelectorAll('.nav-btn').forEach((btn, idx) => {
        btn.classList.remove('current');
        if(idx === currentIndex) btn.classList.add('current');
        const qId = questions[idx].id;
        if(userAnswers[qId] && userAnswers[qId].length > 0) {
            btn.classList.add('attempted');
        } else {
            btn.classList.remove('attempted');
        }
    });
}

function loadQuestion(index) {
    if (questions.length === 0) return;
    currentIndex = index;
    const q = questions[currentIndex];
    
    qNumberEl.innerHTML = `Question ${index + 1} <span style="color:var(--text-muted);font-weight:500;">(Week ${q.week})</span>`;
    qTypeEl.textContent = q.type === 'multiple' ? 'Multiple Choice (MSQ)' : 'Single Choice';
    qTextEl.textContent = q.question;
    
    optionsContainer.innerHTML = '';
    const selected = userAnswers[q.id] || [];

    q.options.forEach((opt, idx) => {
        const label = document.createElement('label');
        label.className = `option-label ${selected.includes(opt) ? 'selected' : ''}`;
        
        const input = document.createElement('input');
        input.type = q.type === 'multiple' ? 'checkbox' : 'radio';
        input.name = `question-${q.id}`;
        input.value = opt;
        if (selected.includes(opt)) input.checked = true;
        if (reviewMode) input.disabled = true;

        if (!reviewMode) {
            input.addEventListener('change', (e) => handleOptionChange(e, opt, q));
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        
        if (reviewMode) {
            if (q.correctAnswers.includes(opt)) {
                label.classList.add('correct');
            } else if (selected.includes(opt)) {
                label.classList.add('wrong');
            }
        }
        optionsContainer.appendChild(label);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === questions.length - 1;
    clearBtn.disabled = reviewMode;
    updateProgress();
}

function handleOptionChange(e, opt, q) {
    if (!userAnswers[q.id]) userAnswers[q.id] = [];
    if (q.type === 'single') {
        userAnswers[q.id] = [opt];
        document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
        e.target.parentElement.classList.add('selected');
    } else {
        if (e.target.checked) {
            userAnswers[q.id].push(opt);
            e.target.parentElement.classList.add('selected');
        } else {
            userAnswers[q.id] = userAnswers[q.id].filter(ans => ans !== opt);
            e.target.parentElement.classList.remove('selected');
        }
    }
    saveState();
    updateProgress();
}

prevBtn.addEventListener('click', () => { if (currentIndex > 0) loadQuestion(currentIndex - 1); });
nextBtn.addEventListener('click', () => { if (currentIndex < questions.length - 1) loadQuestion(currentIndex + 1); });
clearBtn.addEventListener('click', () => {
    if (questions.length === 0) return;
    const qId = questions[currentIndex].id;
    userAnswers[qId] = [];
    saveState();
    loadQuestion(currentIndex);
});

function renderNavGrid() {
    navGrid.innerHTML = '';
    questions.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = idx + 1;
        btn.addEventListener('click', () => loadQuestion(idx));
        navGrid.appendChild(btn);
    });
}

// --- 4. SUBMIT QUIZ & ANALYTICS STORAGE ---
let scorePosted = false; // Flag to prevent multiple submissions to Firebase

submitBtn.addEventListener('click', () => {
    if(reviewMode || questions.length === 0) return;
    
    let score = 0;
    questions.forEach(q => {
        const selected = userAnswers[q.id] || [];
        const correct = q.correctAnswers;
        if (selected.length > 0 && correct.length > 0) {
            const hasWrongSelection = selected.some(val => !correct.includes(val));
            if (!hasWrongSelection) {
                score += (selected.length / correct.length);
            }
        }
    });

    const pointsEarned = Math.round(score * 100) / 100;
    const finalAccuracy = Math.round((pointsEarned / questions.length) * 100);

    document.getElementById('score-points').textContent = pointsEarned;
    document.getElementById('total-points').textContent = questions.length;
    document.getElementById('score-percentage').textContent = `${finalAccuracy}% Accuracy`;
    
    // Save to Personal Analytics History
    let history = JSON.parse(localStorage.getItem('bfe_quiz_history')) || [];
    history.push({
        score: pointsEarned,
        total: questions.length,
        accuracy: finalAccuracy,
        week: currentFilter,
        date: new Date().getTime()
    });
    localStorage.setItem('bfe_quiz_history', JSON.stringify(history));

    // Reset Leaderboard UI state for new completion
    scorePosted = false;
    document.getElementById('post-feedback').classList.add('hidden');
    document.getElementById('player-name').value = '';
    document.getElementById('post-score-btn').textContent = 'Post';
    document.getElementById('post-score-btn').disabled = false;
    
    if(pointsEarned > 0) {
        document.getElementById('leaderboard-submission-area').classList.remove('hidden');
    } else {
        document.getElementById('leaderboard-submission-area').classList.add('hidden');
    }

    localStorage.setItem('bfe_quiz_submitted', 'true');
    resultModal.classList.remove('hidden');
});

// --- 5. POST TO LEADERBOARD FIREBASE ---
document.getElementById('post-score-btn').addEventListener('click', async () => {
    if(scorePosted) return;
    const name = document.getElementById('player-name').value.trim();
    if(!name) return;
    
    const finalScore = parseFloat(document.getElementById('score-points').textContent);
    const totalQ = parseInt(document.getElementById('total-points').textContent);
    const btn = document.getElementById('post-score-btn');
    
    btn.textContent = 'Posting...';
    btn.disabled = true;
    
    try {
        await addDoc(collection(db, "leaderboard"), {
            name: name,
            score: finalScore,
            total: totalQ,
            filter: currentFilter,
            timestamp: Date.now()
        });
        scorePosted = true;
        document.getElementById('post-feedback').classList.remove('hidden');
        btn.textContent = 'Posted!';
        fetchLeaderboard(); // Refresh the board instantly
    } catch (e) {
        console.error(e);
        btn.textContent = 'Post';
        btn.disabled = false;
        alert("Failed to post score. Check console for details.");
    }
});

// --- 6. FETCH LEADERBOARD FIREBASE ---
async function fetchLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    try {
        // Order by score descending, limit to Top 10
        const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        
        let html = '<ul class="leaderboard-list">';
        let rank = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const tag = data.filter !== 'all' ? `<span style="font-size: 0.75rem; color: var(--text-muted);"> (W${data.filter})</span>` : '';
            html += `
                <li>
                    <span class="rank">#${rank}</span>
                    <span class="name">${data.name} ${tag}</span>
                    <span class="score">${data.score}/${data.total}</span>
                </li>
            `;
            rank++;
        });
        html += '</ul>';
        
        if(querySnapshot.empty) {
            html = '<p style="color: var(--text-muted); font-size: 0.9rem;">No scores yet. Complete a quiz to be the first!</p>';
        }
        container.innerHTML = html;
    } catch (e) {
        console.error(e);
        container.innerHTML = '<p style="color: var(--error); font-size: 0.9rem;">Failed to load leaderboard.</p>';
    }
}

// --- 7. PERSONAL ANALYTICS DASHBOARD ---
document.getElementById('stats-btn').addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem('bfe_quiz_history')) || [];
    const container = document.getElementById('stats-container');

    if(history.length === 0) {
        container.innerHTML = "<p style='color: var(--text-muted); text-align: center; margin: 30px 0;'>No data yet. Complete a quiz to see your analytics!</p>";
    } else {
        const totalAcc = history.reduce((sum, h) => sum + h.accuracy, 0);
        const avgAcc = (totalAcc / history.length).toFixed(1);

        // Aggregate by week
        const weekStats = {};
        history.forEach(h => {
            if (h.week !== 'all') {
                if(!weekStats[h.week]) weekStats[h.week] = { sum: 0, count: 0 };
                weekStats[h.week].sum += h.accuracy;
                weekStats[h.week].count += 1;
            }
        });

        let html = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h3 style="color: var(--primary); font-size: 2.5rem;">${avgAcc}%</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Average Accuracy across ${history.length} attempts</p>
            </div>
        `;

        if(Object.keys(weekStats).length > 0) {
            html += `<h4 style="margin-bottom: 20px; color: var(--text-main);">Performance by Module</h4>`;
            for(let w=1; w<=12; w++) {
                if(weekStats[w]) {
                    const wAvg = (weekStats[w].sum / weekStats[w].count).toFixed(1);
                    const barColor = wAvg >= 80 ? 'var(--secondary)' : (wAvg >= 50 ? 'var(--accent)' : 'var(--error)');
                    
                    html += `
                        <div class="stat-row">
                            <div class="stat-label">Week ${w}</div>
                            <div class="stat-bar-bg">
                                <div class="stat-bar-fill" style="width: ${wAvg}%; background: ${barColor};"></div>
                            </div>
                            <div class="stat-value" style="color: ${barColor}">${wAvg}%</div>
                        </div>
                    `;
                }
            }
        } else {
            html += `<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Take some module-specific quizzes (using the Week filter) to unlock weak-point tracking!</p>`;
        }

        html += `
            <div class="prediction-box">
                <h4 style="color: var(--secondary); margin-bottom: 5px;">🎯 Predicted Exam Score</h4>
                <p style="font-size: 1.8rem; font-weight: bold; color: white;">${Math.round((avgAcc / 100) * 180)} <span style="font-size: 1rem; color: var(--text-muted);">/ 180</span></p>
                <p style="font-size: 0.85rem; opacity: 0.8; color: var(--text-muted); margin-top: 5px;">Based on your historical performance.</p>
            </div>
        `;

        container.innerHTML = html;
    }
    document.getElementById('stats-modal').classList.remove('hidden');
});

document.getElementById('close-stats-btn').addEventListener('click', () => {
    document.getElementById('stats-modal').classList.add('hidden');
});

// --- 8. REVIEW & RESET FLOWS ---
document.getElementById('review-btn').addEventListener('click', () => {
    reviewMode = true;
    resultModal.classList.add('hidden');
    submitBtn.style.display = 'none';
    
    document.querySelectorAll('.nav-btn').forEach((btn, idx) => {
        const q = questions[idx];
        const selected = userAnswers[q.id] || [];
        let isCorrect = false, isPartial = false, isWrong = false;

        if(selected.length > 0 && q.correctAnswers.length > 0) {
            const hasWrongSelection = selected.some(val => !q.correctAnswers.includes(val));
            if (hasWrongSelection) {
                isWrong = true; 
            } else if (selected.length === q.correctAnswers.length) {
                isCorrect = true; 
            } else {
                isPartial = true; 
            }
        }
        
        btn.classList.remove('attempted');
        if (isCorrect) btn.classList.add('review-correct');
        else if (isPartial) btn.classList.add('review-partial');
        else if (isWrong) btn.classList.add('review-wrong');
    });
    
    loadQuestion(0);
});

let pendingFilterChange = null;

document.getElementById('force-restart-btn')?.addEventListener('click', () => {
    pendingFilterChange = null; 
    document.getElementById('reset-msg').textContent = "Are you sure you want to restart? Your current progress will be lost.";
    resetModal.classList.remove('hidden');
});

weekFilter.addEventListener('change', (e) => {
    pendingFilterChange = e.target.value;
    document.getElementById('reset-msg').textContent = "Changing the filter will restart the quiz. Proceed?";
    resetModal.classList.remove('hidden');
});

document.getElementById('cancel-reset-btn').addEventListener('click', () => {
    resetModal.classList.add('hidden');
    weekFilter.value = currentFilter;
});

document.getElementById('confirm-reset-btn').addEventListener('click', () => {
    if (pendingFilterChange !== null) localStorage.setItem('bfe_quiz_filter', pendingFilterChange);
    localStorage.removeItem('bfe_quiz_state');
    localStorage.removeItem('bfe_quiz_submitted');
    location.reload();
});

document.getElementById('restart-btn').addEventListener('click', () => location.reload());

// Run
fetchLeaderboard();
initQuiz();