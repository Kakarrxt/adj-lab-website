"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Curve from '@/components/Curve/Curve'
import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity"

// Interfaces for type safety
interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
}

interface Publication {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  abstract?: string; // Added abstract field
}

export default function ResearchPage() {

  const [animationStage, setAnimationStage] = useState<'initial' | 'map-zoom' | 'cells-zoom' | 'cells-out' | 'cells-fade' | 'map-fade-in' | 'reverse-map-zoom'>('initial');
  const [selectedResearch, setSelectedResearch] = useState<ResearchTopic | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Refs for intersection observer
  const researchRef = useRef(null);
  const publicationsRef = useRef(null);
  const isResearchInView = useInView(researchRef, { once: true });
  const isPublicationsInView = useInView(publicationsRef, { once: true });

  

  // Research Topics with more detailed information
  const researchTopics: ResearchTopic[] = [
    {
      id: "molecular-mapping",
      title: "Molecular Mapping",
      description: "Advanced cancer progression analysis",
      fullDescription: "Pioneering research into molecular-level cancer progression mapping, utilizing cutting-edge genomic and proteomic techniques to understand cellular transformations.",
      image: "/media/molecular-mapping.jpg",
      tags: ["Genomics", "Cancer Research", "Molecular Biology"]
    },
    {
      id: "cellular-intervention",
      title: "Cellular Intervention",
      description: "Targeted cellular therapeutic strategies",
      fullDescription: "Developing innovative cellular intervention techniques to disrupt cancer cell growth, focusing on precision medicine and targeted therapeutic approaches.",
      image: "/media/cellular-intervention.jpg",
      tags: ["Therapeutics", "Cell Biology", "Precision Medicine"]
    },
    {
      id: "genetic-markers",
      title: "Genetic Markers",
      description: "Identifying critical tumor development indicators",
      fullDescription: "Comprehensive research into genetic markers that play crucial roles in tumor development, progression, and potential therapeutic targeting.",
      image: "/media/genetic-markers.jpg",
      tags: ["Genetics", "Oncology", "Biomarkers"]
    },
    {
      id: "immunotherapy",
      title: "Advanced Immunotherapy",
      description: "Enhancing immune system cancer response",
      fullDescription: "Groundbreaking immunotherapy research to enhance the body's natural defense mechanisms against cancer, exploring novel immune modulation techniques.",
      image: "/media/immunotherapy.jpg",
      tags: ["Immunology", "Cancer Treatment", "Immune Therapy"]
    }
  ];

  // Publications - Updated with all 10 publications from the list
  const publications: Publication[] = [
    {
      id: "hoang-2024",
      authors: "Hoang, P. M., Torre, D., Jaynes, P., Ho, J., Mohammed, K., Alvstad, E., Lam, W. Y., Khanchandani, V., Lee, J. M., Toh, C. M. C., Lee, R. X., Anbuselvan, A., Lee, S., Sebra, R. P., Martin J Walsh, Marazzi, I., Kappei, D., Guccione, E., & Jeyasekharan, A. D.",
      title: "A PRMT5-ZNF326 axis mediates innate immune activation upon replication stress",
      journal: "Science advances, 10(23), eadm9589",
      year: 2024,
      doi: "10.1126/sciadv.adm9589",
      abstract: "DNA replication stress (RS) is a widespread phenomenon in carcinogenesis, causing genomic instability and extensive chromatin alterations. DNA damage leads to activation of innate immune signaling, but little is known about transcriptional regulators mediating such signaling upon RS. Using a chemical screen, we identified protein arginine methyltransferase 5 (PRMT5) as a key mediator of RS-dependent induction of interferon-stimulated genes (ISGs). This response is also associated with reactivation of endogenous retroviruses (ERVs). Using quantitative mass spectrometry, we identify proteins with PRMT5-dependent symmetric dimethylarginine (SDMA) modification induced upon RS. Among these, we show that PRMT5 targets and modulates the activity of ZNF326, a zinc finger protein essential for ISG response. Our data demonstrate a role for PRMT5-mediated SDMA in the context of RS-induced transcriptional induction, affecting physiological homeostasis and cancer therapy."
    },
    {
      id: "liu-2024",
      authors: "Liu, M., Bertolazzi, G., Sridhar, S., Lee, R. X., Jaynes, P., Mulder, K., Syn, N., Hoppe, M. M., Fan, S., Peng, Y., Thng, J., Chua, R., Jayalakshmi, Batumalai, Y., De Mel, S., Poon, L., Chan, E. H. L., Lee, J., Hue, S. S., Chang, S. T., … Jeyasekharan, A. D.",
      title: "Spatially-resolved transcriptomics reveal macrophage heterogeneity and prognostic significance in diffuse large B-cell lymphoma",
      journal: "Nature communications, 15(1), 2113",
      year: 2024,
      doi: "10.1038/s41467-024-46220-z",
      abstract: "Macrophages are abundant immune cells in the microenvironment of diffuse large B-cell lymphoma (DLBCL). Macrophage estimation by immunohistochemistry shows varying prognostic significance across studies in DLBCL, and does not provide a comprehensive analysis of macrophage subtypes. Here, using digital spatial profiling with whole transcriptome analysis of CD68+ cells, we characterize macrophages in distinct spatial niches of reactive lymphoid tissues (RLTs) and DLBCL. We reveal transcriptomic differences between macrophages within RLTs (light zone /dark zone, germinal center/ interfollicular), and between disease states (RLTs/ DLBCL), which we then use to generate six spatially-derived macrophage signatures (MacroSigs). We proceed to interrogate these MacroSigs in macrophage and DLBCL single-cell RNA-sequencing datasets, and in gene-expression data from multiple DLBCL cohorts. We show that specific MacroSigs are associated with cell-of-origin subtypes and overall survival in DLBCL. This study provides a spatially-resolved whole-transcriptome atlas of macrophages in reactive and malignant lymphoid tissues, showing biological and clinical significance."
    },
    {
      id: "hoppe-2023",
      authors: "Hoppe, M. M., Jaynes, P., Shuangyi, F., Peng, Y., Sridhar, S., Hoang, P. M., Liu, C. X., De Mel, S., Poon, L, Chan, E. H. L., Lee, J., Ong, C. K., Tang, T., Lim, S. T., Nagarajan, C., Grigoropoulos, N. F., Tan, S. Y., Hue, S. S., Chang, S. T., Chuang, S. S., … Jeyasekharan, A. D.",
      title: "Patterns of Oncogene Coexpression at Single-Cell Resolution Influence Survival in Lymphoma",
      journal: "Cancer discovery, 13(5), 1144–1163",
      year: 2023,
      doi: "10.1158/2159-8290.CD-22-0998",
      abstract: "Cancers often overexpress multiple clinically relevant oncogenes, but it is not known if combinations of oncogenes in cellular subpopulations within a cancer influence clinical outcomes. Using quantitative multispectral imaging of the prognostically relevant oncogenes MYC, BCL2, and BCL6 in diffuse large B-cell lymphoma (DLBCL), we show that the percentage of cells with a unique combination MYC+BCL2+BCL6− (M+2+6−) consistently predicts survival across four independent cohorts (n = 449), an effect not observed with other combinations including M+2+6+. We show that the M+2+6− percentage can be mathematically derived from quantitative measurements of the individual oncogenes and correlates with survival in IHC (n = 316) and gene expression (n = 2,521) datasets. Comparative bulk/single-cell transcriptomic analyses of DLBCL samples and MYC/BCL2/BCL6-transformed primary B cells identify molecular features, including cyclin D2 and PI3K/AKT as candidate regulators of M+2+6− unfavorable biology. Similar analyses evaluating oncogenic combinations at single-cell resolution in other cancers may facilitate an understanding of cancer evolution and therapy resistance."
    },
    {
      id: "goh-2022",
      authors: "Goh, J., De Mel, S., Hoppe, M. M., Mohd Abdul Rashid, M. B., Zhang, X. Y., Jaynes, P., Ka Yan Ng, E., Rahmat, N. D. B., Jayalakshmi, Liu, C. X., Poon, L., Chan, E., Lee, J., Chee, Y. L., Koh, L. P., Tan, L. K., Soh, T. G., Yuen, Y. C., Loi, H. Y., Ng, S. B., … Jeyasekharan, A. D.",
      title: "An ex vivo platform to guide drug combination treatment in relapsed/refractory lymphoma",
      journal: "Science translational medicine, 14(667), eabn7824",
      year: 2022,
      doi: "10.1126/scitranslmed.abn7824",
      abstract: "Although combination therapy is the standard of care for relapsed/refractory non-Hodgkin’s lymphoma (RR-NHL), combination treatment chosen for an individual patient is empirical, and response rates remain poor in individuals with chemotherapy-resistant disease. Here, we evaluate an experimental-analytic method, quadratic phenotypic optimization platform (QPOP), for prediction of patient-specific drug combination efficacy from a limited quantity of biopsied tumor samples. In this prospective study, we enrolled 71 patients with RR-NHL (39 B cell NHL and 32 NK/T cell NHL) with a median of two prior lines of treatment, at two academic hospitals in Singapore from November 2017 to August 2021. Fresh biopsies underwent ex vivo testing using a panel of 12 drugs with known efficacy against NHL to identify effective single and combination treatments. Individualized QPOP reports were generated for 67 of 75 patient samples, with a median turnaround time of 6 days from sample collection to report generation. Doublet drug combinations containing copanlisib or romidepsin were most effective against B cell NHL and NK/T cell NHL samples, respectively. Off-label QPOP-guided therapy offered at physician discretion in the absence of standard options (n = 17) resulted in five complete responses. Among patients with more than two prior lines of therapy, the rates of progressive disease were lower with QPOP-guided treatments than with conventional chemotherapy. Overall, this study shows that the identification of patient-specific drug combinations through ex vivo analysis was achievable for RR-NHL in a clinically applicable time frame. These data provide the basis for a prospective clinical trial evaluating ex vivo–guided combination therapy in RR-NHL."
    },
    {
      id: "srinivas-2022",
      authors: "Srinivas, U. S., Tay, N. S. C., Jaynes, P., Anbuselvan, A., Ramachandran, G. K., Wardyn, J. D., Hoppe, M. M., Hoang, P. M., Peng, Y., Lim, S., Lee, M. Y., Peethala, P. C., An, O., Shendre, A., Tan, B. W. Q., Jemimah, S., Lakshmanan, M., Hu, L, Jakhar, R., Sachaphibulkij, K., … Jeyasekharan, A. D.",
      title: "PLK1 inhibition selectively induces apoptosis in ARID1A deficient cells through uncoupling of oxygen consumption from ATP production",
      journal: "Oncogene, 41(13), 1986–2002",
      year: 2022,
      doi: "10.1038/s41388-022-02219-8",
      abstract: "Inhibitors of the mitotic kinase PLK1 yield objective responses in a subset of refractory cancers. However, PLK1 overexpression in cancer does not correlate with drug sensitivity, and the clinical development of PLK1 inhibitors has been hampered by the lack of patient selection marker. Using a high-throughput chemical screen, we discovered that cells deficient for the tumor suppressor ARID1A are highly sensitive to PLK1 inhibition. Interestingly this sensitivity was unrelated to canonical functions of PLK1 in mediating G2/M cell cycle transition. Instead, a whole-genome CRISPR screen revealed PLK1 inhibitor sensitivity in ARID1A deficient cells to be dependent on the mitochondrial translation machinery. We find that ARID1A knock-out (KO) cells have an unusual mitochondrial phenotype with aberrant biogenesis, increased oxygen consumption/expression of oxidative phosphorylation genes, but without increased ATP production. Using expansion microscopy and biochemical fractionation, we see that a subset of PLK1 localizes to the mitochondria in interphase cells. Inhibition of PLK1 in ARID1A KO cells further uncouples oxygen consumption from ATP production, with subsequent membrane depolarization and apoptosis. Knockdown of specific subunits of the mitochondrial ribosome reverses PLK1-inhibitor induced apoptosis in ARID1A deficient cells, confirming specificity of the phenotype. Together, these findings highlight a novel interphase role for PLK1 in maintaining mitochondrial fitness under metabolic stress, and a strategy for therapeutic use of PLK1 inhibitors. To translate these findings, we describe a quantitative microscopy assay for assessment of ARID1A protein loss, which could offer a novel patient selection strategy for the clinical development of PLK1 inhibitors in cancer."
    },
    {
      id: "hoppe-2021",
      authors: "Hoppe, M. M., Jaynes, P., Wardyn, J. D., Upadhyayula, S. S., Tan, T. Z., Lie, S., Lim, D. G. Z., Pang, B. N. K., Lim, S., P S Yeong, J., Karnezis, A., Chiu, D. S., Leung, S., Huntsman, D. G., Sedukhina, A. S., Sato, K., Topp, M. D., Scott, C. L., Choi, H., Patel, N. R., … Jeyasekharan, A. D.",
      title: "Quantitative imaging of RAD51 expression as a marker of platinum resistance in ovarian cancer",
      journal: "EMBO molecular medicine, 13(5), e13366",
      year: 2021,
      doi: "10.15252/emmm.202013366",
      abstract: "Early relapse after platinum chemotherapy in epithelial ovarian cancer (EOC) portends poor survival. A‐priori identification of platinum resistance is therefore crucial to improve on standard first‐line carboplatin–paclitaxel treatment. The DNA repair pathway homologous recombination (HR) repairs platinum‐induced damage, and the HR recombinase RAD51 is overexpressed in cancer. We therefore designed a REMARK‐compliant study of pre‐treatment RAD51 expression in EOC, using fluorescent quantitative immunohistochemistry (qIHC) to overcome challenges in quantitation of protein expression in situ. In a discovery cohort (n = 284), RAD51‐High tumours had shorter progression‐free and overall survival compared to RAD51‐Low cases in univariate and multivariate analyses. The association of RAD51 with relapse/survival was validated in a carboplatin monotherapy SCOTROC4 clinical trial cohort (n = 264) and was predominantly noted in HR‐proficient cancers (Myriad HRDscore < 42). Interestingly, overexpression of RAD51 modified expression of immune‐regulatory pathways in vitro, while RAD51‐High tumours showed exclusion of cytotoxic T cells in situ. Our findings highlight RAD51 expression as a determinant of platinum resistance and suggest possible roles for therapy to overcome immune exclusion in RAD51‐High EOC. The qIHC approach is generalizable to other proteins with a continuum instead of discrete/bimodal expression."
    },
    {
      id: "wardyn-2021",
      authors: "Wardyn, J. D., Chan, A. S. Y., & Jeyasekharan, A. D.",
      title: "A Robust Protocol for CRISPR-Cas9 Gene Editing in Human Suspension Cell Lines",
      journal: "Current protocols, 1(11), e286",
      year: 2021,
      doi: "10.1002/cpz1.286",
      abstract: "The implementation of clustered regularly interspaced short palindromic repeats (CRISPR)-Cas9 systems in mammalian cells has sparked an exciting new era in targeted gene editing. CRISPR-Cas9 technologies allow gene function to be interrogated by gene deletions, mutations, and truncations, and by epitope tagging and promoter activity modulation. Many robust protocols have been published to date on CRISPR-Cas9 techniques, however, most of these focus on adherent cell lines. Suspension cell lines, typically of hematolymphoid origin, such as Jurkat, Daudi, and TOLEDO, pose unique challenges to the setup of CRISPR experiments. Here, using B cell lymphoma cells as a primary model, we describe a comprehensive protocol for targeted gene manipulations using the CRISPR-Cas9 system in suspension cells. We also highlight necessary optimization steps to make this approach universal to other suspension cell lines. We first describe a detailed protocol for transient expression of the Cas9 nuclease and guide RNAs. We then suggest workflows for obtaining single-cell clones and for screening for successful homozygous knockout (KO) clones in suspension lines. This protocol aims to serve as a comprehensive resource to facilitate gene editing experiments for users starting CRISPR-Cas9 gene editing protocols on suspension cell lines or those looking to optimize their current workflows."
    },
    {
      id: "de-mel-2020",
      authors: "de Mel, S., Rashid, M. B. M., Zhang, X. Y., Goh, J., Lee, C. T., Poon, L. M., Chan, E. H. L., Liu, X., Chng, W. J., Chee, Y. L., Lee, J., Yuen, Y. C., Lim, J. Q., Chia, B. K. H., Laurensia, Y., Huang, D., Pang, W. L., Cheah, D. M. Z., Wong, E. K. Y., Ong, C. K., … Jeyasekharan, A. D.",
      title: "Application of an ex-vivo drug sensitivity platform towards achieving complete remission in a refractory T-cell lymphoma",
      journal: "Blood cancer journal, 10(1), 9",
      year: 2020,
      doi: "10.1038/s41408-020-0276-7",
      abstract: "Currently, there are no clinically approved methods for predicting the relative efficacy of drug combinations for individual patients with cancer. Ex-vivo drug sensitivity experiments with patient-derived tumor material potentially offers a solution to identifying appropriate combinations of therapies for individual patients1. However, such assays are typically limited by the quantity available for combinatorial analysis of multiple drugs. We recently developed an experimental–analytical hybrid method, Quadratic phenotypic optimization platform (QPOP), which ranks drug combinations using a limited amount of tumor2. QPOP identifies optimal combinations based on the observation that biological response to perturbations (such as therapeutic intervention) can be mapped to a second-order polynomial equation3. In our initial study, QPOP identified novel therapeutic combinations for drug-resistant multiple myeloma, using ex-vivo testing on primary tumor samples. However, the concordance of QPOP-based drug sensitivity prediction with actual patient response to treatment was not explored in that study. We now present a case illustrating the setup and utilization of a QPOP protocol as a clinical decision aid, to identify an optimal salvage regimen for a patient with refractory lymphoma."
    },
    {
      id: "oon-2019",
      authors: "Oon, M. L., Hoppe, M. M., Fan, S., Phyu, T., Phuong, H. M., Tan, S. Y., Hue, S. S., Wang, S., Poon, L. M., Chan, H. L. E., Lee, J., Chee, Y. L., Chng, W. J., de Mel, S., Liu, X., Jeyasekharan, A. D.*, & Ng, S. B.*",
      title: "The contribution of MYC and PLK1 expression to proliferative capacity in diffuse large B-cell lymphoma",
      journal: "Leukemia & lymphoma, 60(13), 3214–3224",
      year: 2019,
      doi: "10.1080/10428194.2019.1633629",
      abstract: "Polo-like kinase-1 (PLK1) regulates the MYC-dependent kinome in aggressive B-cell lymphoma. However, the role of PLK1 and MYC toward proliferation in diffuse large B-cell lymphoma (DLBCL) is unknown. We use multiplexed fluorescent immunohistochemistry (fIHC) to evaluate the co-localization of MYC, PLK1 and Ki67 to study their association with proliferation in DLBCL. The majority (98%, 95% CI 95–100%) of MYC/PLK1-double positive tumor cells expressed Ki67, underscoring the key role of the MYC/PLK1 circuit in proliferation. However, only 38% (95% CI 23–40%) and 51% (95% CI 46–51%) of Ki67-positive cells expressed MYC and PLK1, respectively. Notably, 40% (95% CI 26–43%) of Ki67-positive cells are MYC- and PLK-negative. A stronger correlation exists between PLK1 and Ki67 expression (R = 0.74, p < .001) than with MYC and Ki67 expression (R = 0.52, p < .001). Overall, the results indicate that PLK1 has a higher association than MYC in DLBCL proliferation and there are mechanisms besides MYC and PLK1 influencing DLBCL proliferation."
    },
    {
      id: "hong-2019",
      authors: "Hong, G., Fan, S., Phyu, T., Maheshwari, P., Hoppe, M. M., Phuong, H. M., de Mel, S., Poon, M., Ng, S. B., & Jeyasekharan, A. D.",
      title: "Multiplexed Fluorescent Immunohistochemical Staining, Imaging, and Analysis in Histological Samples of Lymphoma",
      journal: "Journal of visualized experiments : JoVE, (143), 10.3791/58711",
      year: 2019,
      doi: "10.3791/58711",
      abstract: "Immunohistochemical (IHC) methods for the in-situ analysis of protein expression by light microscopy are a powerful tool for both research and diagnostic purposes. However, the visualization and quantification of multiple antigens in a single tissue section using conventional chromogenic IHC is challenging. Multiplexed imaging is especially relevant in lymphoma research and diagnostics, where markers have to be interpreted in the context of a complex tumor microenvironment. Here we describe a protocol for multiplexed fluorescent IHC staining to enable the quantitative assessment of multiple targets in specific cell types of interest in lymphoma.The method covers aspects of antibody validation, antibody optimization, the multiplex optimization with markers of lymphoma subtypes, the staining of tissue microarray (TMA) slides, and the scanning of the slides, followed by data analysis, with specific reference to lymphoma. Using this method, scores for both the mean intensity of a marker of interest and the percentage positivity are generated to facilitate further quantitative analysis. Multiplexing minimizes sample utilization and provides spatial information for each marker of interest."
    }
  ];


    
    // Advanced background animation logic
    useEffect(() => {
      const animationSequence = () => {
        setAnimationStage('initial');
        setTimeout(() => setAnimationStage('map-zoom'), 1000);
        setTimeout(() => setAnimationStage('cells-zoom'), 3000);
        setTimeout(() => setAnimationStage('cells-out'), 5000);
        setTimeout(() => setAnimationStage('cells-fade'), 7000);
        setTimeout(() => setAnimationStage('map-fade-in'), 8000);
        setTimeout(() => setAnimationStage('reverse-map-zoom'), 10000);
        setTimeout(() => setAnimationStage('initial'), 12000);
      };
      
      animationSequence();
      const interval = setInterval(animationSequence, 13000);
      return () => clearInterval(interval);
    }, []);
    
    // Variants for background animations
    const backgroundVariants = {
      initial: {
        scale: 1,
        opacity: 0.3,
        transition: { duration: 1 }
      },
      'map-zoom': {
        scale: 1.2,
        opacity: 0.5,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'cells-zoom': {
        scale: 1.5,
        opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'cells-out': {
        scale: 1.5,
        opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'cells-fade': {
        scale: 1.2,
        opacity: 0.3,
        transition: { duration: 1, ease: "easeInOut" }
      },
      'map-fade-in': {
        scale: 1,
        opacity: 0.5,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'reverse-map-zoom': {
        scale: 1,
        opacity: 0.3,
        transition: { duration: 2, ease: "easeInOut" }
      }
    };
    
    // Variants specifically for the cells layer
    const cellsVariants = {
      'cells-zoom': {
        scale: 1.8,
        opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'cells-out': {
        scale: 1.5,
        opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
      },
      'cells-fade': {
        scale: 1.2,
        opacity: 0.2,
        transition: { duration: 1, ease: "easeInOut" }
      },
      'map-fade-in': {
        scale: 1,
        opacity: 0,
        transition: { duration: 1, ease: "easeInOut" }
      }
    };
    
    // Filter research topics
    const filteredResearch = filter
      ? researchTopics.filter(topic => topic.tags.includes(filter))
      : researchTopics;
    
    return (
    
      <>
       <Curve backgroundColor="#f1f1f1">
      <div className={styles.container}>
        {/* Dynamic Hero Section */}
        <section className={styles.heroSection}>
          <AnimatePresence>
            <motion.div
              key="nautical-map"
              className={styles.backgroundImage}
              variants={backgroundVariants}
              animate={animationStage}
              initial="initial"
            >
              <Image
                src="/media/Nautical.png"
                alt="Nautical Map Background"
                layout="fill"
                objectFit="cover"
                priority />
            </motion.div>

            {(animationStage === 'cells-zoom' || animationStage === 'cells-out' || animationStage === 'cells-fade') && (
              <motion.div
                key="cells"
                className={styles.backgroundImage}
                style={{ zIndex: 2 }}
                variants={cellsVariants}
                animate={animationStage}
                initial={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                <Image
                  src="/media/cells.jpg"
                  alt="Cancer Cells"
                  layout="fill"
                  objectFit="cover"
                  priority />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: animationStage === 'initial' ? 1 : 0.5,
              scale: 1
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1>ADJ Laboratory</h1>
            <p>Pioneering Cancer Research through Innovative Science</p>
          </motion.div>
        </section>

        {/* Research Topics Section */}
        <section
          ref={researchRef}
          className={styles.researchSection}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isResearchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Our Research Focus
          </motion.h2>

          {/* Research Filters */}
          <div className={styles.filterContainer}>
            {Array.from(new Set(researchTopics.flatMap(topic => topic.tags))).map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(filter === tag ? null : tag)}
                className={`${styles.filterButton} ${filter === tag ? styles.activeFilter : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={styles.researchGrid}>
            {filteredResearch.map((topic) => (
              <motion.div
                key={topic.id}
                className={styles.researchCard}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setSelectedResearch(topic)}
              >
                <div className={styles.cardImageContainer}>
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    layout="fill"
                    objectFit="cover" />
                </div>
                <div className={styles.cardContent}>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className={styles.cardTags}>
                    {topic.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section
          ref={publicationsRef}
          className={styles.publicationsSection}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isPublicationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Selected Publications
          </motion.h2>

          <div className={styles.publicationsContainer}>
            {publications.map((pub) => (
              <motion.div
                key={pub.id}
                className={styles.publicationCard}
                initial={{ opacity: 0, y: 20 }} // Slight vertical offset for initial state
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.2, // Reduced duration for faster transitions
                  ease: "easeOut",
                  delay: publications.findIndex(p => p.id === pub.id) * 0.04 // Adjusted delay for faster stagger
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#f9f9f9' }} // Increased scale for faster hover effect
                onClick={() => setSelectedPublication(pub)}
              >
                <div className={styles.publicationHighlight}></div> {/* Highlight element */}
                <div className={styles.publicationContent}>
                  <h3 className={styles.publicationTitle}>
                    {pub.title}
                  </h3>
                  <div className={styles.publicationInfoLine}> {/* New div for journal and year */}
                    <p className={styles.publicationJournal}>{pub.journal}</p>
                    <p className={styles.publicationYear}>{pub.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Modal */}
        <AnimatePresence>
          {selectedResearch && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setSelectedResearch(null)}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedResearch(null)}
                >
                  ×
                </button>
                <div className={styles.modalHeader}>
                  <h2>{selectedResearch.title}</h2>
                  <div className={styles.modalTags}>
                    {selectedResearch.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.modalImageContainer}>
                  <Image
                    src={selectedResearch.image}
                    alt={selectedResearch.title}
                    layout="fill"
                    objectFit="cover" />
                </div>
                <p className={styles.modalDescription}>
                  {selectedResearch.fullDescription}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Publication Modal */}
        <AnimatePresence>
          {selectedPublication && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }} // Reduced duration for faster modal transition
              onClick={() => setSelectedPublication(null)}
            >
              <motion.div
                className={`${styles.modalContent} ${styles.publicationModalContent}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }} // Reduced duration for faster modal transition
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedPublication(null)}
                >
                  ×
                </button>
                <div className={styles.publicationModalHeader}>
                  <div className={styles.publicationModalYear}>{selectedPublication.year}</div>
                  <h2>{selectedPublication.title}</h2>
                </div>
                <div className={styles.publicationModalBody}>
                  <div className={styles.publicationModalSection}>
                    <h3>Authors</h3>
                    <p>{selectedPublication.authors}</p>
                  </div>
                  <div className={styles.publicationModalSection}>
                    <h3>Journal</h3>
                    <p>{selectedPublication.journal}</p>
                  </div>
                  <div className={styles.publicationModalSection}>
                    <h3>DOI</h3>
                    <a
                      href={`https://doi.org/${selectedPublication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.publicationDoi}
                    >
                      {selectedPublication.doi}
                    </a>
                  </div>
                  {selectedPublication.abstract && (
                    <div className={styles.publicationModalSection}>
                      <h3>Abstract</h3>
                      <p className={styles.publicationAbstract}>{selectedPublication.abstract}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </Curve>
      </>
  );
}