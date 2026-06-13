import { useState, useEffect } from 'react'

function Documents() {
  const [documents, setDocuments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = () => {
    fetch('https://portfolio-website-dngm.onrender.com/api/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setStatus('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://portfolio-website-dngm.onrender.com/api/documents', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setStatus('success')
        fetchDocuments()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setUploading(false)
    }
  }

  const getDocumentLabel = (filename) => {
    const name = filename.toLowerCase()
    if (name.includes('resume')) return 'Résumé'
    if (name.includes('cv')) return 'CV'
    if (name.includes('cover')) return 'Cover Letter'
    if (name.includes('certificate')) return 'Certificate'
    return filename
  }

  return (
    <section className="section" id="documents">
      <p className="section-label">Documents</p>
      <h2>Resources & Downloads</h2>
      <div className="documents-container">
        <div className="documents-list">
          {documents.length === 0 ? (
            <p className="no-documents">No documents uploaded yet.</p>
          ) : (
            documents.map(doc => (
              <div key={doc.filename} className="document-item">
                <div className="document-info">
                  <span className="document-icon">PDF</span>
                  <span className="document-name">
                    {getDocumentLabel(doc.originalname)}
                  </span>
                </div>
               <a
                  href={`https://portfolio-website-dngm.onrender.com${doc.path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="document-download"
                >
                  ↓ Download
                </a>
              </div>
            ))
          )}
        </div>
        <div className="document-upload">
          <label className="upload-label">
            {uploading ? 'Uploading...' : '+ Upload Document'}
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
          {status === 'success' && (
            <p className="form-success">Uploaded successfully!</p>
          )}
          {status === 'error' && (
            <p className="form-error">Upload failed. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Documents