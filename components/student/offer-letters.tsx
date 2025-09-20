"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Building2 } from "lucide-react"

const offerLetters = [
  {
    id: 1,
    company: "TechCorp Inc.",
    role: "Software Engineer",
    package: "₹12 LPA",
    issueDate: "2024-01-10",
    expiryDate: "2024-01-25",
    status: "Pending Response",
    fileName: "techcorp_offer_letter.pdf",
  },
  {
    id: 2,
    company: "DataSys Solutions",
    role: "Data Analyst",
    package: "₹8 LPA",
    issueDate: "2024-01-05",
    expiryDate: "2024-01-20",
    status: "Accepted",
    fileName: "datasys_offer_letter.pdf",
  },
]

export function OfferLetters() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
          <p className="text-muted-foreground mt-1">View and manage your job offers</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      {offerLetters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Offer Letters Yet</h3>
            <p className="text-muted-foreground text-center">
              Your offer letters will appear here once companies extend offers to you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {offerLetters.map((offer) => (
            <Card key={offer.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {offer.company}
                    </CardTitle>
                    <CardDescription>{offer.role}</CardDescription>
                  </div>
                  <Badge variant={offer.status === "Accepted" ? "default" : "outline"}>{offer.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Package</p>
                    <p className="text-2xl font-bold text-primary">{offer.package}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Issue Date</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {offer.issueDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Expiry Date</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {offer.expiryDate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  {offer.status === "Pending Response" && (
                    <>
                      <Button variant="default" className="flex-1">
                        Accept Offer
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Decline Offer
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
