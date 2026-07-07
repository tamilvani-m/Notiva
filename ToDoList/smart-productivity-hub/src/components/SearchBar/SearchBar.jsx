import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../../hooks/useAppData'

function SearchBar({ placeholder = 'Search tasks, notes, reminders...' }) {
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery, searchResults } = useAppData()

  const openResult = (result) => {
    navigate(result.path)
    setSearchQuery('')
  }

  return (
    <div className="search-wrap">
      <label className="search-bar">
        <Search size={18} />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={placeholder}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </label>

      {searchQuery && (
        <div className="search-results" role="listbox" aria-label="Search results">
          <div className="search-results-header">
            <strong>{searchResults.length} results</strong>
            <span>Instant search</span>
          </div>
          {searchResults.length ? (
            searchResults.slice(0, 6).map((result) => (
              <button
                type="button"
                className="search-result"
                onClick={() => openResult(result)}
                key={`${result.type}-${result.id}`}
              >
                <span className="pill blue">{result.type}</span>
                <span>
                  <strong>{result.title}</strong>
                  <small>{result.description}</small>
                </span>
              </button>
            ))
          ) : (
            <p className="empty-state compact">No matching tasks, notes, or reminders.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
