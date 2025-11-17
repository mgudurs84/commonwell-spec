import type { ApiCategory } from "@shared/schema";

export const apiCategories: ApiCategory[] = [
  {
    id: "patient-management",
    name: "Patient Management",
    description: "Create, retrieve, update, and delete patient records in the Master Patient Index (MPI)",
    color: "#3b82f6",
    endpoints: [
      {
        id: "create-patient",
        title: "Create/Update Patient",
        method: "POST",
        endpoint: "/v2/org/{OrgId}/Patient",
        category: "Patient Management",
        description: "Create a new patient record or update existing patient demographics in the MPI",
        request: `POST /v2/org/2.16.840.1.113883.3.101/Patient HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json

{
  "identifier": [
    {
      "use": "official",
      "system": "2.16.840.1.113883.3.101.1",
      "value": "10000",
      "assigner": {
        "reference": "Organization/2.16.840.1.113883.3.101"
      }
    }
  ],
  "name": [
    {
      "family": "Anderson",
      "given": ["David"],
      "prefix": ["Mr"]
    }
  ],
  "birthDate": "1969-10-24",
  "gender": "male",
  "address": [
    {
      "use": "home",
      "line": ["8123 Hawthorne Ave"],
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60612"
    }
  ]
}`,
        response: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "patients": [],
  "links": [
    {
      "rel": "self",
      "href": "https://api.integration.commonwellalliance.lkopera.com/v2/org/2.16.840.1.113883.3.101/Patient/10000"
    }
  ],
  "status": {
    "message": "Patient successfully created.",
    "code": 201
  }
}`
      },
      {
        id: "get-patient",
        title: "Get Patient",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}",
        category: "Patient Management",
        description: "Retrieve patient record from MPI based on local patient identifier",
        request: `GET /v2/org/2.16.840.1.113883.3.101/Patient/10000^2.16.840.1.113883.3.101.1^ISO HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "patients": [
    {
      "identifier": [
        {
          "use": "official",
          "system": "2.16.840.1.113883.3.101.1",
          "value": "10000"
        }
      ],
      "name": [
        {
          "family": "Anderson",
          "given": ["David"]
        }
      ],
      "birthDate": "1969-10-24",
      "gender": "male",
      "active": true
    }
  ],
  "status": {
    "message": "Patient successfully retrieved.",
    "code": 200
  }
}`
      },
      {
        id: "delete-patient",
        title: "Delete Patient",
        method: "DELETE",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}",
        category: "Patient Management",
        description: "Delete a patient from MPI (soft delete - sets status to inactive)",
        request: `DELETE /v2/org/2.16.840.1.113883.3.101/Patient/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient successfully deleted.",
    "code": 200
  }
}`
      },
      {
        id: "merge-patient",
        title: "Merge Patient Records",
        method: "PUT",
        endpoint: "/v2/org/{OrgId}/Patient/{NonSurvivingPatientID}/Merge",
        category: "Patient Management",
        description: "Merge two patient records (non-surviving merged into surviving)",
        request: `PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/Merge HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json

{
  "link": [
    {
      "other": {
        "reference": "Patient/10150"
      },
      "type": "replaced-by"
    }
  ]
}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patients successfully merged.",
    "code": 200
  }
}`
      },
      {
        id: "set-disclosure",
        title: "Set Patient Disclosure",
        method: "POST",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}/Disclosure",
        category: "Patient Management",
        description: "Configure data sharing consent and purpose of use settings",
        request: `POST /v2/org/2.16.840.1.113883.3.101/Patient/10000/Disclosure HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json

{
  "consentToDisclose": true,
  "disclosure": {
    "networks": [
      {
        "code": "CommonWell",
        "purposeOfUse": [
          {
            "code": "TREATMENT",
            "consent": true
          }
        ]
      }
    ]
  }
}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Disclosure settings updated successfully.",
    "code": 200
  }
}`
      }
    ]
  },
  {
    id: "patient-linking",
    name: "Patient Identification & Linking",
    description: "Search for and manage patient links across organizations and health systems",
    color: "#10b981",
    endpoints: [
      {
        id: "get-patient-links-id",
        title: "Get Patient Links by ID",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/PatientLink/{PatientID}",
        category: "Patient Identification & Linking",
        description: "Retrieve confirmed patient links (LOLA 2) for a local patient",
        request: `GET /v2/org/2.16.840.1.113883.3.101/PatientLink/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "patients": [
    {
      "identifier": [
        {
          "use": "official",
          "system": "2.16.840.1.113883.3.101.1",
          "value": "10000"
        }
      ],
      "name": [
        {
          "family": "Anderson",
          "given": ["David"]
        }
      ]
    }
  ]
}`
      },
      {
        id: "get-patient-links-demo",
        title: "Get Patient Links by Demographics",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/PatientLink?fname={fname}&lname={lname}&dob={dob}&gender={gender}&zip={zip}",
        category: "Patient Identification & Linking",
        description: "Retrieve patient links using demographic search parameters (LOLA 2)",
        searchParams: [
          "fname (required): First name",
          "lname (required): Last name",
          "dob (required): yyyy-MM-dd format",
          "gender: M/F/U/O",
          "zip (required): ZIP code"
        ],
        request: `GET /v2/org/2.16.840.1.113883.3.101/PatientLink?fname=David&lname=Anderson&dob=1969-10-24&gender=M&zip=60612 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "patients": [
    {
      "identifier": [
        {
          "system": "2.16.840.1.113883.3.101.1",
          "value": "10000"
        }
      ],
      "name": [
        {
          "family": "Anderson",
          "given": ["David"]
        }
      ],
      "birthDate": "1969-10-24",
      "gender": "male"
    }
  ]
}`
      },
      {
        id: "get-probable-links",
        title: "Get Probable Links by ID",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/ProbableLink/{PatientID}",
        category: "Patient Identification & Linking",
        description: "Retrieve probable patient matches (LOLA 1) that require manual confirmation",
        request: `GET /v2/org/2.16.840.1.113883.3.101/ProbableLink/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "patients": [
    {
      "identifier": [
        {
          "use": "official",
          "system": "2.16.840.1.113883.3.101.1",
          "value": "10001"
        }
      ],
      "name": [
        {
          "family": "Andersen",
          "given": ["Dave"]
        }
      ]
    }
  ]
}`
      },
      {
        id: "link-patient",
        title: "Link Patient (Confirm Match)",
        method: "PUT",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}/patientLink/{LinkID}/Link",
        category: "Patient Identification & Linking",
        description: "Manually confirm and create a LOLA 2 link from a probable match",
        request: `PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/patientLink/001B590E-B2CD-4ADC-B654-8C8990941F77/Link HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient link confirmed successfully.",
    "code": 200
  }
}`
      },
      {
        id: "unlink-patient",
        title: "Unlink Patient",
        method: "PUT",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}/patientLink/{LinkID}/Unlink",
        category: "Patient Identification & Linking",
        description: "Remove an existing patient link and prevent future auto-linking",
        request: `PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/patientLink/D9500583-6755-492A-9C35-0D396B7501ED/Unlink HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient link removed successfully.",
    "code": 200
  }
}`
      },
      {
        id: "reset-patient-links",
        title: "Reset Patient Links",
        method: "PUT",
        endpoint: "/v2/org/{OrgId}/Patient/{PatientID}/ResetLink",
        category: "Patient Identification & Linking",
        description: "Detach all LOLA 2 links from the specified patient",
        request: `PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/ResetLink HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient links reset successfully.",
    "code": 200
  }
}`
      }
    ]
  },
  {
    id: "fhir-apis",
    name: "FHIR APIs - Document Query & Retrieve",
    description: "Query and retrieve clinical documents using FHIR R4 resources",
    color: "#8b5cf6",
    endpoints: [
      {
        id: "fhir-document-query",
        title: "FHIR Document Query",
        method: "GET",
        endpoint: "/v2/R4/DocumentReference?subject.id={system}|{value}",
        category: "FHIR Document Query & Retrieve",
        description: "Query for documents using FHIR R4 DocumentReference resource with search parameters",
        searchParams: [
          "subject.id (required): Assigning authority | patient identifier",
          "author.given: Author given name",
          "author.family: Author family name",
          "status: current | superseded | entered-in-error"
        ],
        request: `GET /v2/R4/DocumentReference?subject.id=2.16.840.1.113883.3.101.1|22198911&status=current HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Accept: application/fhir+json`,
        response: `HTTP/1.1 200 OK
Content-Type: application/fhir+json

{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "fullUrl": "https://api.integration.commonwellalliance.lkopera.com/v2/R4/DocumentReference/abc123",
      "resource": {
        "resourceType": "DocumentReference",
        "id": "abc123",
        "status": "current",
        "subject": {
          "reference": "Patient/22198911"
        },
        "date": "2025-06-01",
        "content": [
          {
            "attachment": {
              "url": "https://api.integration.commonwellalliance.lkopera.com/v2/R4/Binary/xyz456",
              "contentType": "application/pdf"
            }
          }
        ]
      }
    }
  ]
}`
      },
      {
        id: "fhir-document-retrieve",
        title: "FHIR Document Retrieve (Binary)",
        method: "GET",
        endpoint: "/v2/R4/Binary/{id}",
        category: "FHIR Document Query & Retrieve",
        description: "Retrieve document content using FHIR Binary resource",
        request: `GET /v2/R4/Binary/xyz456 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/pdf

%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
...
(binary PDF content)`
      },
      {
        id: "fhir-patient-match",
        title: "FHIR Patient Match (US Core)",
        method: "POST",
        endpoint: "/v2/R4/Patient/$match",
        category: "FHIR Document Query & Retrieve",
        description: "Search for and retrieve patient matches using FHIR Patient resource",
        request: `POST /v2/R4/Patient/$match HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/fhir+json

{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "resource",
      "resource": {
        "resourceType": "Patient",
        "identifier": [
          {
            "system": "2.16.840.1.113883.3.101.1",
            "value": "22198911"
          }
        ],
        "name": [
          {
            "family": "Anderson",
            "given": ["David"]
          }
        ],
        "birthDate": "1969-10-24",
        "gender": "male"
      }
    }
  ]
}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/fhir+json

{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "fullUrl": "https://api.integration.commonwellalliance.lkopera.com/v2/R4/Patient/22198911",
      "resource": {
        "resourceType": "Patient",
        "id": "22198911",
        "identifier": [
          {
            "use": "official",
            "system": "2.16.840.1.113883.3.101.1",
            "value": "22198911"
          }
        ],
        "name": [
          {
            "family": "Anderson",
            "given": ["David"]
          }
        ],
        "birthDate": "1969-10-24",
        "gender": "male"
      }
    }
  ]
}`
      }
    ]
  },
  {
    id: "xca-apis",
    name: "XCA APIs - Cross-Community Access",
    description: "Query and retrieve documents using IHE XCA profile with SOAP/XML messaging",
    color: "#6366f1",
    endpoints: [
      {
        id: "xca-query",
        title: "XCA Query (ITI-38)",
        method: "SOAP",
        endpoint: "/v2/XCAQuery",
        category: "XCA Document Query & Retrieve",
        description: "Cross-Community Access query for documents using SOAP/XML",
        request: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header>
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
        <!-- SAML 2.0 Bearer Token -->
      </saml2:Assertion>
    </wsse:Security>
  </soap:Header>
  <soap:Body>
    <query:AdhocQueryRequest xmlns:query="urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0">
      <query:ResponseOption returnComposedObjects="true" returnType="LeafClass"/>
    </query:AdhocQueryRequest>
  </soap:Body>
</soap:Envelope>`,
        response: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <query:AdhocQueryResponse xmlns:query="urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0" status="urn:oasis:names:tc:ebxml-regrep:ResponseStatusType:Success">
      <rim:RegistryObjectList xmlns:rim="urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0">
        <!-- Query results -->
      </rim:RegistryObjectList>
    </query:AdhocQueryResponse>
  </soap:Body>
</soap:Envelope>`
      },
      {
        id: "xca-retrieve",
        title: "XCA Retrieve (ITI-39)",
        method: "SOAP",
        endpoint: "/v2/XCARetrieve",
        category: "XCA Document Query & Retrieve",
        description: "Retrieve document content using Cross-Community Access protocol",
        request: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <xca:RetrieveDocumentSetRequest xmlns:xca="urn:ihe:iti:xds-b:2007">
      <xca:DocumentRequest>
        <xca:RepositoryUniqueId>2.16.840.1.113883.3.101</xca:RepositoryUniqueId>
        <xca:DocumentUniqueId>2.16.840.1.113883.3.101.123</xca:DocumentUniqueId>
      </xca:DocumentRequest>
    </xca:RetrieveDocumentSetRequest>
  </soap:Body>
</soap:Envelope>`,
        response: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <xca:RetrieveDocumentSetResponse xmlns:xca="urn:ihe:iti:xds-b:2007">
      <rs:RegistryResponse xmlns:rs="urn:oasis:names:tc:ebxml-regrep:xsd:rs:3.0" status="urn:oasis:names:tc:ebxml-regrep:ResponseStatusType:Success"/>
      <xca:DocumentResponse>
        <xca:Document>base64EncodedDocumentContent</xca:Document>
      </xca:DocumentResponse>
    </xca:RetrieveDocumentSetResponse>
  </soap:Body>
</soap:Envelope>`
      }
    ]
  },
  {
    id: "notifications",
    name: "Event Notifications",
    description: "Manage real-time notifications for patient events and document availability",
    color: "#f59e0b",
    endpoints: [
      {
        id: "subscribe-notifications",
        title: "Subscribe to Notifications",
        method: "POST",
        endpoint: "/v2/org/{OrgId}/Subscription",
        category: "Event Notifications",
        description: "Create a subscription to receive notifications for patient events",
        request: `POST /v2/org/2.16.840.1.113883.3.101/Subscription HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json

{
  "criteria": "Patient?_id=10000",
  "channel": {
    "type": "rest-hook",
    "endpoint": "https://your-server.com/notifications",
    "payload": "application/fhir+json"
  },
  "status": "active"
}`,
        response: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "sub-12345",
  "status": "active",
  "criteria": "Patient?_id=10000",
  "channel": {
    "type": "rest-hook",
    "endpoint": "https://your-server.com/notifications"
  }
}`
      },
      {
        id: "get-subscription",
        title: "Get Subscription",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/Subscription/{SubscriptionID}",
        category: "Event Notifications",
        description: "Retrieve details of an existing subscription",
        request: `GET /v2/org/2.16.840.1.113883.3.101/Subscription/sub-12345 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "sub-12345",
  "status": "active",
  "criteria": "Patient?_id=10000",
  "channel": {
    "type": "rest-hook",
    "endpoint": "https://your-server.com/notifications"
  }
}`
      },
      {
        id: "delete-subscription",
        title: "Delete Subscription",
        method: "DELETE",
        endpoint: "/v2/org/{OrgId}/Subscription/{SubscriptionID}",
        category: "Event Notifications",
        description: "Cancel and remove an active subscription",
        request: `DELETE /v2/org/2.16.840.1.113883.3.101/Subscription/sub-12345 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Subscription deleted successfully.",
    "code": 200
  }
}`
      }
    ]
  },
  {
    id: "administrative",
    name: "Administrative APIs",
    description: "Organization management, provider directory, and system configuration",
    color: "#64748b",
    endpoints: [
      {
        id: "get-organization",
        title: "Get Organization",
        method: "GET",
        endpoint: "/v2/org/{OrgId}",
        category: "Administrative",
        description: "Retrieve organization details and configuration",
        request: `GET /v2/org/2.16.840.1.113883.3.101 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "resourceType": "Organization",
  "id": "2.16.840.1.113883.3.101",
  "identifier": [
    {
      "system": "urn:oid:2.16.840.1.113883.3.101",
      "value": "2.16.840.1.113883.3.101"
    }
  ],
  "name": "Example Healthcare Organization",
  "active": true
}`
      },
      {
        id: "get-provider",
        title: "Get Provider Directory",
        method: "GET",
        endpoint: "/v2/org/{OrgId}/Practitioner",
        category: "Administrative",
        description: "Query provider directory for healthcare practitioners",
        searchParams: [
          "family: Provider last name",
          "given: Provider first name",
          "identifier: NPI or other identifier"
        ],
        request: `GET /v2/org/2.16.840.1.113883.3.101/Practitioner?family=Smith HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`,
        response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "resource": {
        "resourceType": "Practitioner",
        "id": "pract-001",
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "value": "1234567890"
          }
        ],
        "name": [
          {
            "family": "Smith",
            "given": ["John"],
            "prefix": ["Dr"]
          }
        ]
      }
    }
  ]
}`
      }
    ]
  }
];
