from contextlib import contextmanager
from typing import Any, Generator
from sqlalchemy.orm.session import Session
from db.connection import SessionLocal


@contextmanager
def get_session() -> Generator[Session, Any, None]:
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()

    