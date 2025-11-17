'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const APIDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  interface ApiEndpointProps {
    id: string;
    title: string;
    method: string;
    endpoint: string;
    description: string;
    category: string;
    request: string;
    response: string;
    searchParams?: string[];
  }

  const ApiEndpoint = ({ id, title, method, endpoint, description, category, request, response, searchParams }: ApiEndpointProps) => {
    const isExpanded = expandedSections[id];
    const methodColors: Record<string, string> = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      'HL7 v2.x': 'bg-purple-100 text-purple-800',
      'SOAP': 'bg-indigo-100 text-indigo-800'
    };

    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1 text-left">
            <span className={`px-3 py-1 rounded-md font-semibold text-xs whitespace-nowrap ${methodColors[method] || 'bg-gray-200'}`}>
              {method}
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 font-mono break-all">{endpoint}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-4">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Category:</strong> {category}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {description}
              </p>
            </div>

            {searchParams && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Search Parameters:</h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  {searchParams.map((param, idx) => (
                    <li key={idx}>{param}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto relative">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words">{request}</pre>
                  <button
                    onClick={() => copyToClipboard(request, `req-${id}`)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Copy request"
                  >
                    {copiedId === `req-${id}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto relative">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words">{response}</pre>
                  <button
                    onClick={() => copyToClipboard(response, `res-${id}`)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Copy response"
                  >
                    {copiedId === `res-${id}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CommonWell Health Alliance API</h1>
          <p className="text-lg text-gray-600">Specification v4.3 - Complete API Reference</p>
          <p className="text-sm text-gray-500 mt-2">Last Updated: June 3, 2025</p>
        </div>

        {/* REST APIs - Patient Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
            REST APIs - Patient Management
          </h2>

          <ApiEndpoint
            id="create-patient"
            title="Create/Update Patient"
            method="POST"
            endpoint="/v2/org/{OrgId}/Patient"
            category="Patient Management"
            description="Create a new patient record or update existing patient demographics in the MPI"
            request={`POST /v2/org/2.16.840.1.113883.3.101/Patient HTTP/1.1
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
}`}
            response={`HTTP/1.1 201 Created
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
}`}
          />

          <ApiEndpoint
            id="get-patient"
            title="Get Patient"
            method="GET"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}"
            category="Patient Management"
            description="Retrieve patient record from MPI based on local patient identifier"
            request={`GET /v2/org/2.16.840.1.113883.3.101/Patient/10000^2.16.840.1.113883.3.101.1^ISO HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Content-Type: application/json`}
            response={`HTTP/1.1 200 OK
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
}`}
          />

          <ApiEndpoint
            id="delete-patient"
            title="Delete Patient"
            method="DELETE"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}"
            category="Patient Management"
            description="Delete a patient from MPI (soft delete - sets status to inactive)"
            request={`DELETE /v2/org/2.16.840.1.113883.3.101/Patient/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient successfully deleted.",
    "code": 200
  }
}`}
          />

          <ApiEndpoint
            id="merge-patient"
            title="Merge Patient Records"
            method="PUT"
            endpoint="/v2/org/{OrgId}/Patient/{NonSurvivingPatientID}/Merge"
            category="Patient Management"
            description="Merge two patient records (non-surviving merged into surviving)"
            request={`PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/Merge HTTP/1.1
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
}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patients successfully merged.",
    "code": 200
  }
}`}
          />

          <ApiEndpoint
            id="set-disclosure"
            title="Set Patient Disclosure"
            method="POST"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}/Disclosure"
            category="Patient Management"
            description="Configure data sharing consent and purpose of use settings"
            request={`POST /v2/org/2.16.840.1.113883.3.101/Patient/10000/Disclosure HTTP/1.1
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
}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Disclosure settings updated successfully.",
    "code": 200
  }
}`}
          />
        </section>

        {/* REST APIs - Patient Identification & Linking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-500">
            REST APIs - Patient Identification & Linking
          </h2>

          <ApiEndpoint
            id="get-patient-links-id"
            title="Get Patient Links by ID"
            method="GET"
            endpoint="/v2/org/{OrgId}/PatientLink/{PatientID}"
            category="Patient Identification & Linking"
            description="Retrieve confirmed patient links (LOLA 2) for a local patient"
            request={`GET /v2/org/2.16.840.1.113883.3.101/PatientLink/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
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
}`}
          />

          <ApiEndpoint
            id="get-patient-links-demo"
            title="Get Patient Links by Demographics"
            method="GET"
            endpoint="/v2/org/{OrgId}/PatientLink?fname={fname}&lname={lname}&dob={dob}&gender={gender}&zip={zip}"
            category="Patient Identification & Linking"
            description="Retrieve patient links using demographic search parameters (LOLA 2)"
            searchParams={['fname (required): First name', 'lname (required): Last name', 'dob (required): yyyy-MM-dd format', 'gender: M/F/U/O', 'zip (required): ZIP code']}
            request={`GET /v2/org/2.16.840.1.113883.3.101/PatientLink?fname=David&lname=Anderson&dob=1969-10-24&gender=M&zip=60612 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
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
}`}
          />

          <ApiEndpoint
            id="get-probable-links"
            title="Get Probable Links by ID"
            method="GET"
            endpoint="/v2/org/{OrgId}/ProbableLink/{PatientID}"
            category="Patient Identification & Linking"
            description="Retrieve probable patient matches (LOLA 1) that require manual confirmation"
            request={`GET /v2/org/2.16.840.1.113883.3.101/ProbableLink/10000 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
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
}`}
          />

          <ApiEndpoint
            id="link-patient"
            title="Link Patient (Confirm Match)"
            method="PUT"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}/patientLink/{LinkID}/Link"
            category="Patient Identification & Linking"
            description="Manually confirm and create a LOLA 2 link from a probable match"
            request={`PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/patientLink/001B590E-B2CD-4ADC-B654-8C8990941F77/Link HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient link confirmed successfully.",
    "code": 200
  }
}`}
          />

          <ApiEndpoint
            id="unlink-patient"
            title="Unlink Patient"
            method="PUT"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}/patientLink/{LinkID}/Unlink"
            category="Patient Identification & Linking"
            description="Remove an existing patient link and prevent future auto-linking"
            request={`PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/patientLink/D9500583-6755-492A-9C35-0D396B7501ED/Unlink HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient link removed successfully.",
    "code": 200
  }
}`}
          />

          <ApiEndpoint
            id="reset-patient-links"
            title="Reset Patient Links"
            method="PUT"
            endpoint="/v2/org/{OrgId}/Patient/{PatientID}/ResetLink"
            category="Patient Identification & Linking"
            description="Detach all LOLA 2 links from the specified patient"
            request={`PUT /v2/org/2.16.840.1.113883.3.101/Patient/10000/ResetLink HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": {
    "message": "Patient links reset successfully.",
    "code": 200
  }
}`}
          />
        </section>

        {/* FHIR APIs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-500">
            FHIR APIs - Document Query & Retrieve
          </h2>

          <ApiEndpoint
            id="fhir-document-query"
            title="FHIR Document Query"
            method="GET"
            endpoint="/v2/R4/DocumentReference?subject.id={system}|{value}"
            category="FHIR Document Query & Retrieve"
            description="Query for documents using FHIR R4 DocumentReference resource with search parameters"
            searchParams={['subject.id (required): Assigning authority | patient identifier', 'author.given: Author given name', 'author.family: Author family name', 'status: current | superseded | entered-in-error']}
            request={`GET /v2/R4/DocumentReference?subject.id=2.16.840.1.113883.3.101.1|22198911&status=current HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}
Accept: application/fhir+json`}
            response={`HTTP/1.1 200 OK
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
}`}
          />

          <ApiEndpoint
            id="fhir-document-retrieve"
            title="FHIR Document Retrieve (Binary)"
            method="GET"
            endpoint="/v2/R4/Binary/{id}"
            category="FHIR Document Query & Retrieve"
            description="Retrieve document content using FHIR Binary resource"
            request={`GET /v2/R4/Binary/xyz456 HTTP/1.1
Host: api.integration.commonwellalliance.lkopera.com
Authorization: Bearer {JWT}`}
            response={`HTTP/1.1 200 OK
Content-Type: application/pdf

%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
...
(binary PDF content)`}
          />

          <ApiEndpoint
            id="fhir-patient-match"
            title="FHIR Patient Match (US Core)"
            method="POST"
            endpoint="/v2/R4/Patient/$match"
            category="FHIR Document Query & Retrieve"
            description="Search for and retrieve patient matches using FHIR Patient resource"
            request={`POST /v2/R4/Patient/$match HTTP/1.1
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
}`}
            response={`HTTP/1.1 200 OK
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
}`}
          />
        </section>

        {/* XCA APIs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-500">
            XCA APIs - Cross-Community Access
          </h2>

          <ApiEndpoint
            id="xca-query"
            title="XCA Query (ITI-38)"
            method="SOAP"
            endpoint="/v2/XCAQuery"
            category="XCA Document Query & Retrieve"
            description="Cross-Community Access query for documents using SOAP/XML"
            request={`<?xml version="1.0" encoding="UTF-8"?>
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
</soap:Envelope>`}
            response={`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <query:AdhocQueryResponse xmlns:query="urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0" status="urn:oasis:names:tc:ebxml-regrep:ResponseStatusType:Success">
      <rim:RegistryObjectList xmlns:rim="urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0">
        <!-- Query results -->
      </rim:RegistryObjectList>
    </query:AdhocQueryResponse>
  </soap:Body>
</soap:Envelope>`}
          />

          <ApiEndpoint
            id="xca-retrieve"
            title="XCA Retrieve (ITI-39)"
            method="SOAP"
            endpoint="/v2/XCARetrieve"
            category="XCA Document Query & Retrieve"
            description="Cross-Community Access retrieve documents using SOAP/XML"
            request={`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <xca:RetrieveDocumentSetRequest xmlns:xca="urn:ihe:iti:xds-b:2007">
      <xca:DocumentRequest>
        <xca:HomeCommunityId>urn:oid:2.16.840.1.113883.3.2611.9.99.101</xca:HomeCommunityId>
        <xca:RepositoryUniqueId>r4</xca:RepositoryUniqueId>
        <xca:DocumentUniqueId>docId123</xca:DocumentUniqueId>
      </xca:DocumentRequest>
    </xca:RetrieveDocumentSetRequest>
  </soap:Body>
</soap:Envelope>`}
            response={`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <xca:RetrieveDocumentSetResponse xmlns:xca="urn:ihe:iti:xds-b:2007">
      <xca:DocumentResponse>
        <xca:HomeCommunityId>urn:oid:2.16.840.1.113883.3.2611.9.99.101</xca:HomeCommunityId>
        <xca:RepositoryUniqueId>r4</xca:RepositoryUniqueId>
        <xca:DocumentUniqueId>docId123</xca:DocumentUniqueId>
        <xca:mimeType>application/pdf</xca:mimeType>
        <xca:Document>%PDF-1.4...</xca:Document>
      </xca:DocumentResponse>
    </xca:RetrieveDocumentSetResponse>
  </soap:Body>
</soap:Envelope>`}
          />
        </section>

        {/* PIX HL7 APIs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-pink-500">
            PIX - Patient Identity Feed (HL7 v2.x)
          </h2>
          <p className="text-gray-700 mb-6">MLLP-based HL7 v2.3.1+ ADT messages. All messages must include MSH, EVN, and PID segments with X.509 client certificate over TLS.</p>

          <ApiEndpoint
            id="pix-a01"
            title="Patient Admit/Register (A01)"
            method="HL7 v2.x"
            endpoint="MLLP-based PIX service"
            category="PIX Patient Identity Feed"
            description="ADT A01 - Admit Inpatient or A04 Register Outpatient message"
            request={`MSH|^~\\&|CLINICALAPP|StJohnsHosp|COMMONWELL|CHBROKER|20250610094415||ADT^A01|1234|P|2.5
EVN|A01|20250610094415|||^Admitting Clerk
PID|1||10000^^^2.16.840.1.113883.3.101.1||Anderson^David||19691024|M|||8123 Hawthorne Ave^^Chicago^IL^60612^USA||222-222-2228||ENG|
PV1|1|I|ICU^ICU101^1^^^S|H|||Dr. Smith|||||||||||||1234|`}
            response={`MSH|^~\\&|COMMONWELL|CHBROKER|CLINICALAPP|StJohnsHosp|20250610094416||ACK^A01|5678|P|2.5
MSA|AA|1234`}
          />

          <ApiEndpoint
            id="pix-a08"
            title="Patient Update (A08)"
            method="HL7 v2.x"
            endpoint="MLLP-based PIX service"
            category="PIX Patient Identity Feed"
            description="ADT A08 - Update Patient Information message"
            request={`MSH|^~\\&|CLINICALAPP|StJohnsHosp|COMMONWELL|CHBROKER|20250615120000||ADT^A08|5001|P|2.5
EVN|A08|20250615120000|||^System
PID|1||10000^^^2.16.840.1.113883.3.101.1||Anderson^David||19691024|M|||8123 Hawthorne Ave^^Chicago^IL^60615^USA||222-222-2228||ENG|
PV1|1|O|OPD^OPD02^1^^^S|H||||||||||`}
            response={`MSH|^~\\&|COMMONWELL|CHBROKER|CLINICALAPP|StJohnsHosp|20250615120001||ACK^A08|5002|P|2.5
MSA|AA|5001`}
          />

          <ApiEndpoint
            id="pix-a40"
            title="Patient Merge (A40)"
            method="HL7 v2.x"
            endpoint="MLLP-based PIX service"
            category="PIX Patient Identity Feed"
            description="ADT A40 - Merge Patient Records (internal ID merge)"
            request={`MSH|^~\\&|CLINICALAPP|StJohnsHosp|COMMONWELL|CHBROKER|20250620150000||ADT^A40|6001|P|2.5
EVN|A40|20250620150000|||^MergeUser
PID|1||10150^^^2.16.840.1.113883.3.101.1||Anderson^David||19691024|M|||8123 Hawthorne Ave^^Chicago^IL^60612^USA||222-222-2228||ENG|
MRG|10000^^^2.16.840.1.113883.3.101.1`}
            response={`MSH|^~\\&|COMMONWELL|CHBROKER|CLINICALAPP|StJohnsHosp|20250620150001||ACK^A40|6002|P|2.5
MSA|AA|6001`}
          />
        </section>

        {/* Security & Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-500">
            Security & Authentication
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">REST APIs (JSON/FHIR)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Authentication:</strong> JWT Bearer Token</li>
                <li><strong>Token Location:</strong> Authorization HTTP Header</li>
                <li><strong>Max Expiration:</strong> 8 hours</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">SOAP/XCA APIs</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Authentication:</strong> SAML 2.0 Token</li>
                <li><strong>Token Location:</strong> SOAP Security Header</li>
                <li><strong>Client Certificate:</strong> X.509 WebTrust-certified</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">PIX/HL7 APIs</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Transport:</strong> MLLP (Minimal Lower Layer Protocol)</li>
                <li><strong>Security:</strong> TLS with X.509 client certificate</li>
                <li><strong>Version:</strong> HL7 v2.3.1 or higher</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Transport Security</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Protocol:</strong> TLS 1.2 or higher</li>
                <li><strong>Cipher Suites:</strong> Strong ciphers only</li>
                <li><strong>Certificate Chain:</strong> Validated root CA</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Document Version:</strong> CommonWell Health Alliance Specification v4.3 (Approved 2025-06-03)
          </p>
          <p className="text-sm text-gray-600">
            <strong>Service Root URLs:</strong>
          </p>
          <ul className="text-xs text-gray-500 ml-4 mt-1 space-y-1 font-mono">
            <li>Integration: https://api.integration.commonwellalliance.lkopera.com</li>
            <li>Production: https://api.commonwellalliance.lkopera.com</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            All examples are representative and may require adjustment based on your specific implementation requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;