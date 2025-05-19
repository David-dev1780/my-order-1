"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ChevronRight, Clock, Crown, Coins, Lock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for current affairs
const currentAffairs = [
  {
    id: "1",
    title: "Union Budget 2025 Highlights",
    summary:
      "The Finance Minister presented the Union Budget 2025 with a focus on infrastructure development, healthcare, and education.",
    date: "May 17, 2025",
    readTime: "5 min",
    category: "Economy",
    isPremium: false,
    tokenCost: 0,
    image: "/placeholder.svg?height=200&width=350",
    content: `The Union Budget 2025 has allocated ₹12 lakh crore for infrastructure development, ₹8 lakh crore for healthcare, and ₹6 lakh crore for education. The budget aims to boost economic growth and create employment opportunities. 

The Finance Minister announced several new initiatives including a comprehensive digital health program, expansion of the education sector through technology integration, and major investments in renewable energy. The budget also includes tax reforms aimed at simplifying the tax structure and promoting compliance.

Experts have praised the balanced approach to fiscal management while addressing key development priorities. The budget focuses on:

1. Infrastructure development with emphasis on rural connectivity
2. Healthcare system strengthening post-pandemic
3. Education reforms aligned with the National Education Policy
4. Digital economy initiatives including blockchain and AI
5. Green energy transition with incentives for electric vehicles

The fiscal deficit target has been set at 4.5% of GDP, with a roadmap for reduction over the next three years. Revenue projections show a 15% increase, primarily from improved tax compliance and economic growth.`,
  },
  {
    id: "2",
    title: "International Summit on Climate Change",
    summary:
      "World leaders gathered in Geneva to discuss measures to combat climate change and reduce carbon emissions by 2030.",
    date: "May 16, 2025",
    readTime: "6 min",
    category: "International",
    isPremium: true,
    tokenCost: 5,
    image: "/placeholder.svg?height=200&width=350",
    content: `The summit saw participation from 195 countries, with major economies pledging to reduce carbon emissions by 50% by 2030. A new global fund of $100 billion was announced to help developing countries transition to clean energy.

The summit addressed critical issues including carbon pricing mechanisms, technology transfer to developing nations, and adaptation strategies for vulnerable communities. Several breakthrough agreements were reached on phasing out coal power, accelerating electric vehicle adoption, and protecting forest ecosystems.

The final declaration emphasized the urgency of action, noting that the current decade is critical for preventing catastrophic climate impacts. Key outcomes include:

1. Binding commitments to carbon neutrality by 2050
2. Creation of a global carbon market with standardized pricing
3. Technology sharing framework for renewable energy solutions
4. Climate adaptation fund for vulnerable nations
5. Monitoring and enforcement mechanisms with penalties for non-compliance

Scientists present at the summit presented new data showing accelerated ice melt in polar regions and rising sea levels, adding urgency to the discussions.`,
  },
  {
    id: "3",
    title: "Supreme Court Verdict on Electoral Bonds",
    summary:
      "The Supreme Court delivered a landmark judgment on the constitutionality of electoral bonds and political funding.",
    date: "May 15, 2025",
    readTime: "4 min",
    category: "Polity",
    isPremium: false,
    tokenCost: 2,
    image: "/placeholder.svg?height=200&width=350",
    content: `In a 4:1 verdict, the Supreme Court declared the electoral bonds scheme unconstitutional, citing concerns about transparency in political funding. The court ordered all political parties to disclose donor details within two months.

The judgment emphasized the citizens' right to information about political funding as essential to democratic functioning. The majority opinion stated that anonymous donations undermine electoral integrity and increase the risk of quid pro quo arrangements.

The lone dissenting judge argued that donor privacy serves legitimate purposes in protecting contributors from potential retaliation. Political parties now face the challenge of adapting to a more transparent funding regime while maintaining donor relationships.

The court outlined a new framework for political donations that balances transparency with reasonable privacy protections. The ruling is expected to significantly impact campaign financing in upcoming elections.`,
  },
  {
    id: "4",
    title: "New Space Mission Announced",
    summary:
      "ISRO announced its next mission to study the outer atmosphere of Earth, scheduled for launch in December 2025.",
    date: "May 14, 2025",
    readTime: "5 min",
    category: "Science",
    isPremium: true,
    tokenCost: 5,
    image: "/placeholder.svg?height=200&width=350",
    content: `The mission, named 'Aakash-1', will deploy a satellite in low Earth orbit to study the ionosphere and its impact on communication systems. This is part of ISRO's broader initiative to enhance India's space capabilities.

The satellite will carry six scientific instruments developed by Indian research institutions to measure atmospheric parameters, electromagnetic fields, and particle distributions. Data from Aakash-1 will help improve weather forecasting, telecommunications, and navigation systems.

The mission represents a significant advancement in indigenous space technology, with over 95% of components manufactured in India. ISRO officials highlighted the mission's role in training the next generation of space scientists and engineers.

The Aakash-1 mission builds on previous successful missions and incorporates several technological innovations:

1. Advanced multi-spectral imaging capabilities
2. Improved solar panel efficiency for extended mission life
3. Indigenous propulsion system with precision maneuvering
4. Real-time data transmission with enhanced bandwidth
5. Modular design allowing for future upgrades

The mission is expected to operate for at least five years, providing valuable data for both scientific research and practical applications.`,
  },
  {
    id: "5",
    title: "G20 Economic Forum",
    summary: "India hosted the G20 Economic Forum focusing on global economic recovery and sustainable development.",
    date: "May 13, 2025",
    readTime: "4 min",
    category: "Economy",
    isPremium: false,
    tokenCost: 1,
    image: "/placeholder.svg?height=200&width=350",
    content: `The forum concluded with a joint declaration emphasizing the need for inclusive growth, digital transformation, and climate action. India proposed a new framework for international cooperation on digital currencies.

The three-day summit addressed pressing challenges including post-pandemic economic recovery, supply chain resilience, and reducing global inequality. Finance ministers agreed on principles for regulating digital assets while promoting innovation in financial technologies.

A significant breakthrough came with the announcement of a coordinated approach to debt relief for low-income countries. The Indian presidency successfully built consensus on contentious issues, earning praise for its diplomatic approach to multilateral economic governance.

The forum established working groups on:
1. Digital economy and financial inclusion
2. Sustainable infrastructure financing
3. Global tax reform and anti-corruption measures
4. Trade facilitation and supply chain resilience
5. Climate finance and green transitions

The next G20 meeting is scheduled for November in Brazil, where progress on these initiatives will be reviewed.`,
  },
  {
    id: "6",
    title: "New Education Policy Implementation",
    summary: "The government announced full implementation of the New Education Policy across all states by 2026.",
    date: "May 12, 2025",
    readTime: "6 min",
    category: "Education",
    isPremium: false,
    tokenCost: 2,
    image: "/placeholder.svg?height=200&width=350",
    content: `The policy focuses on holistic development, skill-based learning, and multilingualism. States have been given a roadmap for phased implementation, with financial assistance from the central government.

The implementation plan includes comprehensive teacher training programs, infrastructure upgrades, and curriculum redesign. Key innovations include flexible academic pathways, integration of vocational education, and emphasis on critical thinking over rote learning.

The policy aims to increase gross enrollment ratio in higher education to 50% by 2035. Special provisions address the needs of socioeconomically disadvantaged groups and students with disabilities. Education experts have welcomed the timeline while emphasizing the need for adequate funding and monitoring mechanisms.

The implementation will proceed in three phases:
1. 2025-2026: Foundational and preparatory stage reforms
2. 2026-2027: Middle school curriculum and assessment changes
3. 2027-2028: Secondary and higher education restructuring

A national monitoring committee will track progress and address implementation challenges across states.`,
  },
  {
    id: "7",
    title: "Breakthrough in Quantum Computing",
    summary: "Indian scientists achieved a significant breakthrough in quantum computing with a new algorithm.",
    date: "May 11, 2025",
    readTime: "5 min",
    category: "Technology",
    isPremium: true,
    tokenCost: 5,
    image: "/placeholder.svg?height=200&width=350",
    content: `The algorithm, developed at IISc Bangalore, solves complex optimization problems 100 times faster than conventional methods. This has potential applications in drug discovery, cryptography, and artificial intelligence.

The research team demonstrated the algorithm's effectiveness on a 50-qubit quantum processor, achieving quantum advantage for a class of problems previously considered intractable. The breakthrough leverages a novel approach to quantum error correction that significantly improves computational stability.

Industry partners have already expressed interest in commercializing the technology for applications in financial modeling and logistics optimization. The achievement positions India as a significant player in the global quantum computing landscape, potentially accelerating the timeline for practical quantum applications.

The research has been published in Nature Quantum Information and has been hailed as one of the most significant advances in quantum computing this year. The team is now working on scaling the algorithm to work with larger quantum systems and expanding its application domains.`,
  },
  {
    id: "8",
    title: "Historic Trade Agreement",
    summary: "India signed a comprehensive trade agreement with the European Union after 10 years of negotiations.",
    date: "May 10, 2025",
    readTime: "4 min",
    category: "Economy",
    isPremium: false,
    tokenCost: 2,
    image: "/placeholder.svg?height=200&width=350",
    content: `The agreement eliminates tariffs on 90% of goods traded between India and the EU. It includes provisions for services, investments, and intellectual property rights, potentially boosting bilateral trade by $100 billion annually.

The agreement creates new opportunities for Indian IT services, pharmaceuticals, and agricultural products in European markets. European automotive, machinery, and luxury goods manufacturers gain improved access to India's growing consumer market.

Negotiators overcame longstanding differences on labor standards, environmental regulations, and data localization requirements. The agreement includes mechanisms for dispute resolution and periodic review of implementation. Economic analysts project the creation of millions of jobs in both regions over the next decade as trade and investment flows increase.

Key sectors expected to benefit include:
1. Information technology and digital services
2. Pharmaceuticals and healthcare
3. Automotive and engineering
4. Agricultural products and processed foods
5. Renewable energy and green technologies

The agreement will be phased in over five years, with sensitive sectors receiving longer transition periods.`,
  },
]

// Categories for filtering
const categories = ["All", "Economy", "International", "Polity", "Science", "Technology", "Education"]

export default function CurrentAffairsPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState(50)
  const [openArticle, setOpenArticle] = useState<string | null>(null)
  const [unlockedArticles, setUnlockedArticles] = useState<string[]>([])

  // Filter articles based on selected category and search query
  const filteredArticles = currentAffairs
    .filter((article) => selectedCategory === "All" || article.category === selectedCategory)
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // Get the currently open article
  const currentArticle = currentAffairs.find((article) => article.id === openArticle)

  // Handle token spending
  const spendTokens = (amount: number) => {
    if (tokens >= amount) {
      setTokens(tokens - amount)
      toast({
        title: `${amount} Token${amount > 1 ? "s" : ""} Spent`,
        description: "You've unlocked premium content",
      })
      return true
    } else {
      toast({
        title: "Not Enough Tokens",
        description: "You need more tokens to unlock this content",
        variant: "destructive",
      })
      return false
    }
  }

  // Unlock premium content
  const unlockArticle = (articleId: string, cost: number) => {
    if (spendTokens(cost)) {
      setUnlockedArticles([...unlockedArticles, articleId])
    }
  }

  // Check if an article is unlocked
  const isArticleUnlocked = (article: (typeof currentAffairs)[0]) => {
    return !article.isPremium || unlockedArticles.includes(article.id) || article.tokenCost === 0
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Current Affairs</h1>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex items-center bg-muted/50 px-3 py-1 rounded-full">
            <Coins className="h-4 w-4 mr-1 text-amber-500" />
            <span className="text-sm font-medium">{tokens} tokens</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              {article.isPremium && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              )}
              {!article.isPremium && article.tokenCost > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-500 text-white">
                    <Coins className="h-3 w-3 mr-1" />
                    {article.tokenCost} tokens
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge className="bg-primary text-white">{article.category}</Badge>
              </div>
            </div>
            <CardContent className="flex-grow p-4">
              <h2 className="mb-2 text-xl font-bold text-black">{article.title}</h2>
              <p className="mb-4 text-black">{article.summary}</p>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-1 h-4 w-4" />
                <span className="mr-4">{article.date}</span>
                <Clock className="mr-1 h-4 w-4" />
                <span>{article.readTime} read</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setOpenArticle(article.id)}>
                  Read Article
                </Button>
                <Button asChild>
                  <Link href={`/current-affairs/quiz/${article.id}`}>
                    Take Quiz
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Article Dialog */}
      {currentArticle && (
        <Dialog open={!!openArticle} onOpenChange={(open) => !open && setOpenArticle(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary">{currentArticle.category}</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span className="mr-4">{currentArticle.date}</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{currentArticle.readTime} read</span>
                </div>
              </div>
              <DialogTitle className="text-2xl">{currentArticle.title}</DialogTitle>
              <DialogDescription>{currentArticle.summary}</DialogDescription>
            </DialogHeader>

            <div className="relative h-64 w-full my-4">
              <Image
                src={currentArticle.image || "/placeholder.svg"}
                alt={currentArticle.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            {isArticleUnlocked(currentArticle) ? (
              <div className="prose max-w-none text-black">
                {currentArticle.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}

                <div className="mt-6 flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/current-affairs/quiz/${currentArticle.id}`}>
                      Take Quiz
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-amber-50 border border-amber-200 flex flex-col items-center justify-center">
                <Lock className="h-12 w-12 text-amber-500 mb-4" />
                <h4 className="text-lg font-semibold text-amber-700 mb-2">Premium Content</h4>
                <p className="text-center mb-4 text-black">
                  This is premium content. Unlock it by spending {currentArticle.tokenCost} tokens.
                </p>
                <Button
                  onClick={() => unlockArticle(currentArticle.id, currentArticle.tokenCost)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600"
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Unlock for {currentArticle.tokenCost} Tokens
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
